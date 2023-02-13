import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
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
        "http://localhost:8080/touristapp/Login.php",
        payload
        // {
        //   params: {
        //     // request: "login",
        //     email: `${formdata?.email}`,
        //     password: `${formdata?.password}`,
        //   },
        // }
      );
      console.log(response);
      console.log(response?.data?.message[0]);
      if (response?.data?.message?.length > 0) {
        alert("Login Successful");
        sessionStorage.setItem("role", response?.data?.message[0]?.Role);
        sessionStorage.setItem("userId", response?.data?.message[0]?.idUsers);
      }

      if (response?.data?.message[0]?.Role === "Admin") {
        window.location.href = "/admin-home";
      }

      if (response?.data?.message[0]?.Role === "User") {
        window.location.href = "/home";
      }
      console.log(response?.data);
    } catch (error) {
      console.log(error);
      alert("Login failed, check details");
    }
  };

  return (
    <>
      <div className="">
        <Row className="g-0">
          <p className="text-center mt-5 fs-2 fw-bold">Find Hotels Near you</p>
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
              <p className="mb-3 fw-bold text-white text-center">Login</p>
              <Form.Group className="mb-2 rounded rounded-3">
                <Form.Label className="small text-white">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={formdata?.email}
                  onChange={handleChange}
                  placeholder="Enter email..."
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
                Login
              </Button>
              <p className="text-center text-white mt-3">
                Don't have an account?{" "}
                <span className="fw-bold">
                  <Link to="/register" className="text-white">
                    Register here
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

export default Login;
