import React from "react";
import { Container, Navbar } from "react-bootstrap";

const About = () => {
  const style = {
    backgroundColor: "#2F4F4F",
  };
  return (
    <>
      {/* Navbar */}
      <Navbar style={style} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/home">Tour with us</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="btn-group">
              {/* <Navbar.Text>
                Hi,
                <span
                  onClick={handleLogout}
                  className="ms-2 text-light nav-item "
                >
                  Logout
                </span>
              </Navbar.Text> */}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="py-5 my-5">
          <div className="fw-bold fs-1 mb-5">ABOUT US</div>
          <div className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            harum dolores sed! Debitis, officiis. Qui voluptate tenetur omnis
            quidem vero impedit aut maxime accusantium, molestiae delectus sit,
            dolor officiis, corporis minus deserunt pariatur exercitationem
            dolores sed dolore quae soluta. Nostrum voluptates impedit similique
            id? Odit exercitationem illo dolores consequuntur placeat nulla
            ipsam. Voluptatibus maxime autem, nostrum eos, ex perspiciatis totam
            quam expedita, fugit molestias veritatis atque quibusdam pariatur
            voluptatem neque animi minima ad distinctio soluta! Aliquid facilis
            tempora ducimus eos fuga. Atque ea aut quae ratione voluptatibus,
            nihil omnis. Accusamus, tenetur. Iste nesciunt incidunt earum porro
            est, beatae voluptatum reiciendis?
          </div>
          <br />
          <div className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            harum dolores sed! Debitis, officiis. Qui voluptate tenetur omnis
            quidem vero impedit aut maxime accusantium, molestiae delectus sit,
            dolor officiis, corporis minus deserunt pariatur exercitationem
            dolores sed dolore quae soluta. Nostrum voluptates impedit similique
            id? Odit exercitationem illo dolores consequuntur placeat nulla
            ipsam. Voluptatibus maxime autem, nostrum eos, ex perspiciatis totam
            quam expedita, fugit molestias veritatis atque quibusdam pariatur
            voluptatem neque animi minima ad distinctio soluta! Aliquid facilis
            tempora ducimus eos fuga. Atque ea aut quae ratione voluptatibus,
            nihil omnis. Accusamus, tenetur. Iste nesciunt incidunt earum porro
            est, beatae voluptatum reiciendis?
          </div>
        </div>
      </Container>

      <footer>
        <Container>
            <div className="fs-3 fw-semibold">
                Contact us
            </div>
            <div className="lead">
                <span className="fw-semibold">Phone</span>: 080 234 433 10
                <br />
                <span className="fw-semibold">Email</span>: tourwithme@abeerden.com
            </div>
        </Container>
      </footer>
    </>
  );
};

export default About;
