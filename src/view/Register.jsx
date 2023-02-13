import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const style = {
    backgroundColor: "green",
  };

  const formBg = {
    background: "#2F4F4F",
  };

  const textColor = {
    color: "#ab2656",
  };

  const width = {
    width: "70%",
  };

  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const payload = { ...formdata };
    try {
      const response = await axios.post(
        "http://localhost:8080/touristapp/Register.php",
        payload
      );
      console.log(response);
      console.log(response?.data?.message);
      if (response?.data?.message === "Registration Successful") {
        alert("Registration successful, proceed to login");
        window.location.href = "/";
      }
      if (response?.data?.message === "User Already Exists") {
        alert("User Already exists");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="">
        <Row className="g-0">
          <p className="text-center mt-5 fs-2 fw-bold">Welcome!</p>
          <Col className="w-100 d-flex justify-content-center align-items-center">
            <Form
              className="p-5 mt-4 w-50 rounded rounded-3"
              style={{ ...width, ...formBg }}
            >
              <p className="mb-3 text-center " style={textColor}>
                <a
                  className="text-decoration-none "
                  style={textColor}
                  href="/"
                ></a>
              </p>
              <p className="mb-3 fw-bold text-white text-center">Register</p>
              <Form.Group className="mb-2 rounded rounded-3">
                <Form.Label className="small text-white">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  defaultValue={formdata?.firstname}
                  onChange={handleChange}
                  placeholder="Firstname..."
                />
              </Form.Group>

              <Form.Group className="mb-2 rounded rounded-3">
                <Form.Label className="small text-white">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  defaultValue={formdata?.lastname}
                  onChange={handleChange}
                  placeholder="Lastname..."
                />
              </Form.Group>

              <Form.Group className="mb-2 rounded rounded-3">
                <Form.Label className="small text-white">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={formdata?.email}
                  onChange={handleChange}
                  placeholder="Enter email/Username"
                />
              </Form.Group>

              <Form.Group className="mb-3 rounded rounded-3">
                <div className="d-flex justify-content-between">
                  <Form.Label className="small text-white">Password</Form.Label>
                </div>
                <Form.Control
                  type="password"
                  name="password"
                  defaultValue={formdata?.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button
                className="w-100 rounded border-0 rounded-3 mt-3"
                style={style}
                type="button"
                onClick={handleSubmit}
              >
                Register
              </Button>
              <p className="text-center text-white mt-3">
                Have an account already?{" "}
                <span className="fw-bold">
                  <Link to="/" className="text-white">
                    Login here
                  </Link>
                </span>
              </p>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
