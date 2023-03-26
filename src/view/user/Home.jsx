import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal, Navbar } from "react-bootstrap";

const Home = () => {
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = "/";
  };

  const [hotels, setHotels] = useState([]);
  const [view, setView] = useState();
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [showAddPost, setAddPost] = useState(false);

  const handleCloseAddPosts = () => {
    setAddPost(false);
  };
  const handleAddPosts = () => {
    setAddPost(true);
  };

  // formdata to collect post details
  const [post, setPost] = useState({
    name: "",
    desc: "",
    location: "",
  });

  const handlePostChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // formdata to collect img details
  const [imgData, setImgData] = useState({
    img: "",
  });

  // convert image to base64
  const encodeImageFileAsURL = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setImgData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [formdata, setFormdata] = useState({
    comment: "",
  });

  // add post
  const handleUpload = async () => {
    const payload = {
      Name: post?.name,
      Address: post?.location,
      Description: post?.desc,
      Image: imgData,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/touristapp/AddHotel.php",
        payload
      );
      console.log(response);
      if (response?.status === 200) {
        alert("Post added successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("There was an error");
    }
  };

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
    // const payload = {
    //   hotelid: id,
    // };

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
        console.log(response?.data?.message[0]?.Comments.split(";"));
        setComments(response?.data?.message[0]?.Comments.split(","));
      }
    } catch (error) {
      console.log("Cannot View hotel, please refresh");
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

  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels?.length);
  console.log(sessionStorage);
  return (
    <>
      {/* Navbar */}
      <Navbar style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/home">Browse Stories</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="btn-group">
              <Navbar.Text
                onClick={handleAddPosts}
                className="mx-5"
                role="button"
              >
                Add Stories
              </Navbar.Text>
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
        {sessionStorage?.userId && (
          <div className="my-3">Number of Posts: {hotels?.length}</div>
        )}
      </Container>
      {/* Hotel cards */}
      <Container>
        <section className="mt-5 d-flex flex-wrap gap-5">
          {hotels?.length > 0 && !sessionStorage?.userId ? (
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
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="secondary"
                        onClick={() => handleShow(item?.idHotels)}
                      >
                        View Post
                      </Button>
                      {/* <Button
                        variant="danger"
                        onClick={() => removeHotel(item?.idHotels)}
                      >
                        Delete
                      </Button> */}
                      {/* <Button
                        variant="info"
                        onClick={() => handleEdit(item?.idHotels)}
                      >
                        Edit
                      </Button> */}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : hotels?.length > 0 && sessionStorage?.userId ? (
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
                    <div className="d-flex justify-content-between">
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
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h3>No Stories added yet</h3>
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
              {view?.Comments === null
                ? "Be the first to comment"
                : comments.map((comms) => (
                    <div className="shadow-sm bg-light rounded p-2 mb-2">
                      - {comms}
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

      {/*Add Posts modal */}
      <Modal
        show={showAddPost}
        onHide={handleCloseAddPosts}
        backdrop="static"
        keyboard={false}
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name of Hotel</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={post?.name}
                onChange={handlePostChange}
                placeholder="Name of hotel..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                defaultValue={post?.location}
                onChange={handlePostChange}
                placeholder="Add location..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                defaultValue={post?.desc}
                onChange={handlePostChange}
                placeholder="Add a description..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Add an image</Form.Label>
              <Form.Control
                type="file"
                name="img"
                defaultValue={post?.img}
                onChange={encodeImageFileAsURL}
                placeholder="Add an image..."
              />
            </Form.Group>

            <div className="text-end my-3">
              <Button onClick={() => handleUpload()} type="button" className="">
                Add Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
