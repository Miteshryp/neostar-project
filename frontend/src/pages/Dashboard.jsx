import React, { useContext, useEffect } from "react";
import axios from "../utils/backend_setting";

import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  let redirect = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("/client/login").then((res) => {
      console.log("HELOEIOFHRIB", res);
    });
  }, []);

  return (
    <Container className="py-3">
      {console.log("HIIII", user)}
      {user ? (
        <>
          <Row>
            <Col sm={6} className="text-center">
              <h4>Welcome, {user.name}</h4>
            </Col>
            <Col sm={6} className="text-center">
              <Button
                className="float-sm-right"
                onClick={() => {
                  redirect.push("/booking", user);
                }}
              >
                Book an Appointment
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="my-5 mx-4">
                <Card.Header as="h5" className="card-dashboard-heading">
                  DASHBOARD
                </Card.Header>
                <Card.Body className="text-center card-dashboard-body">
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  FIND US NEAR YOU
                </Card.Header>
              </Card>
            </Col>

            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  KNOW TREATMENT
                </Card.Header>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  DENTAL HEALTH RISK
                </Card.Header>
              </Card>
            </Col>

            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  DENTAL HEALTH RISK
                </Card.Header>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>non signin</>
      )}
    </Container>
  );
}
