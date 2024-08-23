import React from "react";
import "./footer.css";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Footer = () => {
  return (
    <MDBFooter
      className="text-center text-white footer"
      style={{
        backgroundColor: "#a99985",
        width: "90%",
        margin: "0 auto",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
    >
      <MDBContainer className="pt-4">
        <section className="mb-4">
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon
              fab
              className="fab fa-facebook-f"
              style={{ color: "black" }}
            />
          </MDBBtn>
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-twitter" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-google" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-instagram" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-linkedin" style={{ color: "black" }} />
          </MDBBtn>
          <MDBBtn
            rippleColor="dark"
            color="link"
            floating
            size="lg"
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab className="fa-github" style={{ color: "black" }} />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-dark" href="#">
          Sponky&Veapach.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
