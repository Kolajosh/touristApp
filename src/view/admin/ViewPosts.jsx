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
        "http://localhost:8080/touristapp/AddComments.php",
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
        "http://localhost:8080/touristapp/ViewHotel.php",
        {
          params: {
            hotelid: id,
          },
        }
      );
      console.log(response);
      if (response?.data?.message?.length > 0) {
        setView(response?.data?.message[0]);
        console.log(response?.data?.message[0]?.Comments);
        console.log(response?.data?.message[0]?.Comments.split(","));
        setComments(response?.data?.message[0]?.Comments.split(","));
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
        "http://localhost:8080/touristapp/ListHotels.php"
      );
      console.log(response);
      if (response?.data?.message?.length > 0) {
        setHotels(response?.data?.message);
      }
      if (response?.data?.message === "Failed to get Hotels") {
        setHotels(null);
        alert("Failed to get hotels");
      }
    } catch (error) {
      console.log(error);
      alert("Can't get Hotels, Kindly refresh");
    }
  };

  //   remove comment
  const handleDelete = async (index) => {
    // console.log(index);
    const payload = {
      userId: Number(sessionStorage?.userId),
      hotelId: Number(view?.idHotels),
      commentIndex: index,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/touristapp/RemoveComment.php",
        payload
        // {
        //   params: {
        //     userId: sessionStorage?.userId,
        //     hotelId: view?.id,
        //     commentIndex: index,
        //   },
        // }
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

  const removeHotel = async (id) => {
    // const payload = {
    //   hotelid: id,
    // };

    try {
      const response = await axios.get(
        "http://localhost:8080/touristapp/RemovePost.php",
        {
          params: {
            hotelid: id,
          },
        }
      );
      console.log(response);
      if (response?.data?.message === "Post Deleted Successfully") {
        alert("Post Deleted Successfully");
        window.location.reload();
      }
      if (response?.status?.message === "Cannot delete, try again") {
        alert("Cannot delete, try again");
      }
    } catch (error) {
      alert("Cannot get users, Kindly refresh");
    }
  };

  const handleEdit = async (id) => {
    // const payload = {
    //   hotelid: id,
    // };

    try {
      const response = await axios.get(
        "http://localhost:8080/touristapp/EditPost.php",
        {
          params: {
            id: id,
          },
        }
      );
      console.log(response?.data);
      //   if (response?.data?.message === "Post Deleted Successfully") {
      //     alert("Post Deleted Successfully");
      //     window.location.reload();
      //   }
      //   if (response?.status?.message === "Cannot delete, try again") {
      //     alert("Cannot delete, try again");
      //   }
    } catch (error) {
      alert("Cannot get users, Kindly refresh");
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels);
  // console.log(JSON.parse(view?.comments));
  return (
    <>
      {/* Navbar */}
      <Navbar style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/admin-home">Admin Portal</Navbar.Brand>
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

      <Container>
        <div className="my-3">Number of Posts: {hotels?.length}</div>
      </Container>

      {/* Hotel cards */}
      <Container>
        <section className="mt-5 d-flex flex-wrap gap-5">
          {hotels?.length > 0 ? (
            <>
              {hotels?.map((item) => (
                <Card key={item?.idHotels} style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={`${item?.Picture}`} />
                  <Card.Body>
                    <Card.Title>{item?.Name}</Card.Title>
                    <Card.Text>{item?.Description}</Card.Text>
                    <Card.Text
                      className="smallc"
                      style={{ fontStyle: "italic" }}
                    >
                      Location: {item?.Address}
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => handleShow(item?.idHotels)}
                    >
                      View Post
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeHotel(item?.idHotels)}
                    >
                      Delete
                    </Button>
                    {/* <Button
                      variant="info"
                      onClick={() => handleEdit(item?.idHotels)}
                    >
                      Edit
                    </Button> */}
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h3>No Hotels added yet</h3>
            </>
          )}
        </section>

        {/* View hotel modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{view?.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img src={`${view?.Picture}`} className="w-75 img-fluid" />
            </div>
            <div>{view?.Description}</div>
            <div className="small" style={{ fontWeight: 500 }}>
              Location: {view?.Address}
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
                onClick={() => handleComments(view?.idHotels)}
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
