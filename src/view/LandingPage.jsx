import React from "react";
import { Carousel, Container, Nav, Navbar } from "react-bootstrap";
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
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
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

      <Container>
        <h3 className="lead fs-1 my-5" id="about">About</h3>
        <div className="lead">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia,
          accusamus. Earum eveniet aperiam adipisci explicabo libero ut commodi.
          Magni non eos totam ad fugit reprehenderit deserunt ex culpa tenetur
          quia atque, veniam iste, distinctio modi sunt omnis, adipisci quae
          quas reiciendis quaerat. Similique accusantium, molestiae quidem
          quasi, et consequuntur doloremque, cumque expedita voluptatem nostrum
          nam. Dicta sapiente consectetur possimus officiis culpa id doloribus
          sint sequi nesciunt itaque perferendis nam cupiditate veniam pariatur
          nobis voluptates commodi quod, fuga provident dignissimos? Aliquam vel
          debitis ducimus corrupti dicta ad voluptatibus quis asperiores maxime
          corporis non cum, tenetur recusandae laboriosam aspernatur. Earum,
          molestiae tenetur!
        </div>
      </Container>

      <Container>
        <div className="d-flex justify-content-center gap-4 my-5">
          <div className="lead">joojo@gmail.com</div>
          <div className="lead">+234 081 00 000 000</div>
          <div className="lead">Aberdeen, Scotland</div>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
