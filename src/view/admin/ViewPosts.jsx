import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Navbar } from "react-bootstrap";

const ViewPosts = () => {
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = "/";
  };

  const [hotels, setHotels] = useState([]);
  const [view, setView] = useState();
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  const [formdata, setFormdata] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleComments = async (id) => {
    const payload = {
      comment: formdata?.comment,
      hotelId: id,
    };
    try {
      const response = await axios.post(
        "https://localhost:7028/api/Hotels/addcomment",
        payload
      );
      console.log(response);
      if (response?.status === 200) {
        alert("Comment addedd successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Comment could not be added");
    }
  };

  const viewHotel = async (id) => {
    const payload = {
      hotelid: id,
    };

    try {
      const response = await axios.get(
        "https://localhost:7028/api/Hotels/viewhotel",
        {
          params: payload,
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setView(response?.data);
        setComments(JSON.parse(response?.data?.comments));
      }
    } catch (error) {
      console.log("Cannot View hotel, please refresh");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    viewHotel(id);
    setShow(true);
  };

  const style = {
    backgroundColor: "#2F4F4F",
  };

  const getHotels = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7028/api/Hotels/listhotels"
      );
      console.log(response);
      if (response?.status === 200) {
        setHotels(response?.data);
      }
    } catch (error) {
      console.log(error);
      alert("Can't get Hotels, Kindly refresh");
    }
  };

  //   remove comment
  const handleDelete = async (index) => {
    try {
      const response = await axios.get(
        "https://localhost:7028/api/Hotels/removecomment",
        {
          params: {
            userId: sessionStorage?.userId,
            hotelId: view?.id,
            commentIndex: index,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Comment removed successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Can't delete comment");
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels);
  console.log(view);
  // console.log(JSON.parse(view?.comments));
  return (
    <>
      {/* Navbar */}
      <Navbar style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/home">Explore Hotels</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="btn-group">
              <Navbar.Text>
                Hi,
                <span
                  onClick={handleLogout}
                  className="ms-2 text-light nav-item "
                >
                  Logout
                </span>
              </Navbar.Text>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hotel cards */}
      <Container>
        <section className="mt-5 d-flex flex-wrap gap-5">
          {hotels?.map((item) => (
            <Card key={item?.id} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/png;base64, ${item?.picture}`}
              />
              <Card.Body>
                <Card.Title>{item?.name}</Card.Title>
                <Card.Text>{item?.description}</Card.Text>
                <Card.Text className="smallc" style={{ fontStyle: "italic" }}>
                  Location: {item?.address}
                </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() => handleShow(item?.id)}
                >
                  View Hotel
                </Button>
              </Card.Body>
            </Card>
          ))}
        </section>

        {/* View hotel modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{view?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img
                src={`data:image/png;base64, ${view?.image}`}
                className="w-75 img-fluid"
              />
            </div>
            <div>{view?.description}</div>
            <div className="small" style={{ fontWeight: 500 }}>
              Location: {view?.address}
            </div>
            <div
              className="mt-3"
              style={{ fontStyle: "italic", fontWeight: 500 }}
            >
              Comments
            </div>
            <div style={{ fontStyle: "italic" }}>
              {view?.comments === null
                ? "Be the first to comment"
                : comments.map((comms, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between shadow-sm bg-light rounded p-2 mb-2"
                    >
                      <div>- {comms}</div>
                      <div
                        onClick={() => handleDelete(index)}
                        className="text-danger"
                        style={{ fontWeight: 500, cursor: "pointer" }}
                      >
                        delete
                      </div>
                    </div>
                  ))}
            </div>
            <div className="mt-3">
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="comment"
                    defaultValue={formdata?.comment}
                    onChange={handleChange}
                    placeholder="Add your comment"
                  />
                </Form.Group>
              </Form>
              <div
                className="text-end mt-2"
                style={{ fontWeight: 500, cursor: "pointer" }}
                onClick={() => handleComments(view?.id)}
              >
                Add comment
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ViewPosts;
