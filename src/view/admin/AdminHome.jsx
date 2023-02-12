import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Modal, Navbar } from "react-bootstrap";

const AdminHome = () => {
  const style = {
    backgroundColor: "#2F4F4F",
  };

  // to logout
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = "/";
  };

  // formdata to collect post details
  const [formdata, setFormdata] = useState({
    name: "",
    desc: "",
    location: "",
  });

  // formdata to collect img details
  const [imgData, setImgData] = useState({
    img: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleImg = (e) => {
    setImgData({
      [e.target.name]: e.target.files[0],
    });
  };

  // add post
  const handleUpload = async () => {
    const payload = {
      Name: formdata?.name,
      Address: formdata?.location,
      Description: formdata.desc,
      Image: imgData.img,
    };

    try {
      const response = await axios.post(
        "https://localhost:7028/api/Hotels/addhotel",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === 200) {
        alert("Post added successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("There was an error");
    }
  };

  const [user, setUser] = useState([]);

  const handleUsers = async () => {
    const payload = {
      userId: sessionStorage?.userId,
    };
    try {
      const response = await axios.get(
        "https://localhost:7028/api/Hotels/listusers",
        {
          params: {
            userId: payload?.userId,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setUser(response?.data);
      }
    } catch (error) {
      alert("Cannot get users, Kindly refresh");
    }
  };

  const handleDelete = async (id) => {
    const payload = {
      userId: sessionStorage?.userId,
    };
    try {
      const response = await axios.delete(
        "https://localhost:7028/api/Hotels/deleteuser",
        {
          params: {
            userId: payload?.userId,
            deletedUser: id,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        alert("User deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      alert("Cannot get users, Kindly refresh");
    }
  };

  const [showUsers, setShowUsers] = useState(false);
  const [showAddPost, setAddPost] = useState(false);

  const handleCloseUsers = () => {
    setShowUsers(false);
  };
  const handleShowUsers = () => {
    handleUsers();
    setShowUsers(true);
  };

  const handleCloseAddPosts = () => {
    setAddPost(false);
  };
  const handleAddPosts = () => {
    setAddPost(true);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/home">Admin Portal</Navbar.Brand>
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

      {/* Dashboard */}
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
          <h3 className="mt-5">Welcome Admin!</h3>
          <Button
            onClick={handleShowUsers}
            className="w-50 p-4 fs-3 rounded border-0 rounded-3 mt-3"
          >
            View Users
          </Button>
          <Button
            href="/admin-view-posts"
            className="btn btn-warning w-50 p-4 fs-3 rounded border-0 rounded-3 mt-3"
          >
            View Posts
          </Button>
          <Button
            onClick={handleAddPosts}
            className="btn btn-success w-50 p-4 fs-3 rounded border-0 rounded-3 mt-3"
          >
            Add Posts
          </Button>
        </div>
      </Container>

      {/* Users modal */}
      <Modal
        show={showUsers}
        onHide={handleCloseUsers}
        backdrop="static"
        keyboard={false}
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title>All Users Registered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user?.map((users, index) => (
            <div
              key={users?.id}
              className="shadow-sm d-flex justify-content-between bg-light rounded p-3 mb-2"
            >
              <div>
                {index + 1}. {users?.firstname} {users?.lastname}
              </div>
              <div>{users?.email}</div>
              <div
                className="text-danger"
                onClick={() => handleDelete(users?.id)}
                style={{ fontWeight: 500, cursor: "pointer" }}
              >
                Delete
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>

      {/*Add Posts modal */}
      <Modal
        show={showAddPost}
        onHide={handleCloseAddPosts}
        backdrop="static"
        keyboard={false}
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Posts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name of Hotel</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={formdata?.name}
                onChange={handleChange}
                placeholder="Name of hotel..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                defaultValue={formdata?.location}
                onChange={handleChange}
                placeholder="Add location..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="desc"
                defaultValue={formdata?.desc}
                onChange={handleChange}
                placeholder="Add a description..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Add an image</Form.Label>
              <Form.Control
                type="file"
                name="img"
                defaultValue={formdata?.img}
                onChange={handleImg}
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

export default AdminHome;
