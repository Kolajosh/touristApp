import React from "react";
import { Carousel, Container, Nav, Navbar } from "react-bootstrap";
import "./LandingPage.css";
// import img1 from "../assets/img1.jpg";
import img2 from "../assets/new.jpg";
// import img3 from "../assets/img3.jpg";
import img4 from "../assets/logo123.png";

const LandingPage = () => {
  const style = {
    background: "#2F4F4F",
  };

  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{
        background: `url(${img2})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        maxWidth: "100%",
      }}
    >
      <Container>
        <div className="d-flex h-100 align-items-center justify-content-between">
          <div>
            <div className="lead fs-1 fw-bold" id="about" style={{}}>
              <img className="w-50" src={img4} alt="logo" />
            </div>
            <div className="lead mt-3 text-white">
              Sharing tour and travel stories within abeerden
            </div>
          </div>

          <div>
            <div className="p-5 bg-light bg-opacity-50 ">
              {/* <button
                onClick={() => (window.location.href = "/home")}
                className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal"
              >
                Home
              </button> */}
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal"
              >
                Login/Sign up
              </button>
              <button
                onClick={() => (window.location.href = "/home")}
                className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal"
              >
                Read Stories
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal"
              >
                Upload Stories
              </button>
              <button
                onClick={() => (window.location.href = "/about")}
                className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal"
              >
                About Us
              </button>
              <button className="px-2 py-3 w-100 mb-4 bg-transparent border-light fw-normal">
                Help
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* <Container>
        <div className="d-flex justify-content-center gap-4 my-5">
          <div className="lead">joojo@gmail.com</div>
          <div className="lead">+234 081 00 000 000</div>
          <div className="lead">Aberdeen, Scotland</div>
        </div>
      </Container> */}
    </div>
  );
};

export default LandingPage;
