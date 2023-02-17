import React from "react";
import { Carousel, Container, Navbar } from "react-bootstrap";
import "./LandingPage.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const LandingPage = () => {
  const style = {
    backgroundColor: "#2F4F4F",
  };

  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      {/* Navbar */}
      <Navbar className="py-3" style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>Explore Hotels</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <div className="p-5">
              <h1 className="lead" style={{ fontSize: "70px" }}>
                Explore vasts <span style={{ fontWeight: 500 }}>hotels</span>
              </h1>
              <h1 className="lead" style={{ fontSize: "70px" }}>
                and get the absolute best
              </h1>
              <h1
                className="lead"
                style={{ fontSize: "70px", fontWeight: 500 }}
              >
                Experience
              </h1>
              <div
                className="big-btn mt-5 fs-2 lead p-5 border rounded rounded-2"
                onClick={() => handleClick()}
              >
                View Hotels
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />

          <Carousel.Caption>
            <div className="p-5">
              <h1 className="lead" style={{ fontSize: "70px" }}>
                Explore vasts <span style={{ fontWeight: 500 }}>hotels</span>
              </h1>
              <h1 className="lead" style={{ fontSize: "70px" }}>
                and get the absolute best
              </h1>
              <h1
                className="lead"
                style={{ fontSize: "70px", fontWeight: 500 }}
              >
                Experience
              </h1>
              <div
                className="big-btn mt-5 fs-2 lead p-5 border rounded rounded-2"
                onClick={() => handleClick()}
              >
                View Hotels
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />

          <Carousel.Caption>
            <div className="p-5">
              <h1 className="lead" style={{ fontSize: "70px" }}>
                Explore vasts <span style={{ fontWeight: 500 }}>hotels</span>
              </h1>
              <h1 className="lead" style={{ fontSize: "70px" }}>
                and get the absolute best
              </h1>
              <h1
                className="lead"
                style={{ fontSize: "70px", fontWeight: 500 }}
              >
                Experience
              </h1>
              <div
                className="big-btn mt-5 fs-2 lead p-5 border rounded rounded-2"
                onClick={() => handleClick()}
              >
                View Hotels
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default LandingPage;
