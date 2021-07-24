import React from "react";

import { Container, Row, Carousel, Image, Col } from "react-bootstrap";

import dabout1 from "../assets/images/dabout1.png";
import dabout2 from "../assets/images/dabout2.png";
import dabout3 from "../assets/images/dabout3.png";

import hiw1 from "../assets/images/hiw1.png";
import hiw2 from "../assets/images/hiw2.png";

import cityImg from "../assets/images/cities.png";
import BottomNav from "../components/BottomNav";
import { useHistory } from "react-router";
import { AiFillCalendar, AiOutlineShoppingCart } from "react-icons/ai";
// Components

export default function DoctorHome() {
  const history = useHistory();
  const para =
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

  return (
    <Container fluid style={{ paddingBottom: "80px" }}>
      <Row>
        <Col className="pt-3">
          <Carousel fade>
            <Carousel.Item>
              <Image className="d-block w-100 h-75" src={dabout1} alt="Second slide" />
            </Carousel.Item>

            <Carousel.Item>
              <Image className="d-block w-100 h-75" src={dabout2} alt="First slide" />
              {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
              <Image className="d-block w-100 h-75" src={dabout3} alt="Second slide" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col className="py-4">
          <h2>Why Join Us</h2>
          <p>{para}</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>We are present here</h2>
        </Col>
      </Row>

      <Row>
        <Col className="py-2">
          <Image fluid src={cityImg} />
        </Col>
      </Row>

      <Row>
        <Col className="py-4">
          <h2>How it works</h2>
          <Row>
            <Col className="pt-3">
              <Carousel fade>
                <Carousel.Item>
                  <Image className="d-block w-100 h-75" src={hiw1} alt="Second slide" />
                </Carousel.Item>

                <Carousel.Item>
                  <Image className="d-block w-100 h-75" src={hiw2} alt="First slide" />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
          <p className="my-3">{para}</p>
        </Col>
      </Row>

      <BottomNav>
        <button onClick={() => history.push("/booking")} className="btn appointment">
          <AiFillCalendar className="mx-1" />
          Book Appointment
        </button>
        <div className="divider"></div>
        <button onClick={() => history.push("/booking")} className="btn shop">
          <AiOutlineShoppingCart className="mx-1" />
          Toothcare
        </button>
      </BottomNav>
    </Container>
  );
}
