import React, { useContext, useEffect } from "react";
import axios from "../utils/backend_setting";

import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function DoctorDashboad() {
  let redirect = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios.get("/doctor/login").then((res) => {
      setUser(res.data.data);
    });
  }, [setUser]);

  return (
    <Container className="py-3">
      {!user ? (
        <>
          <Row>
            <Col className="text-center">
              <h4>Welcome, Dr. ABCD</h4>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="my-5 mx-4">
                <Card.Header as="h5" className="card-dashboard-heading">
                  DASHBOARD
                </Card.Header>
                <Card.Body className="text-center card-dashboard-body">Welcome to doctor's dashboard</Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6} className=" my-4 d-flex justify-content-center">
              <Row className="border-md-right">
                <Col sm={12}>
                  <h3 className="text-center">Pending Appointments</h3>
                </Col>

                <Col sm={6} className=" my-4 d-flex justify-content-center">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Issue</Card.Title>
                      <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Header as="h5" className="text-center card-heading">
                      Clinic : Delhi
                    </Card.Header>
                  </Card>
                </Col>
                <Col sm={6} className=" my-4 d-flex justify-content-center">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Issue</Card.Title>
                      <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Header as="h5" className="text-center card-heading">
                      Clinic : Delhi
                    </Card.Header>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={6} className=" my-4 d-flex justify-content-center">
              <Row>
                <Col sm={12}>
                  <h3 className="text-center">Confirmed Appointments</h3>
                </Col>

                <Col sm={6} className=" my-4 d-flex justify-content-center">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Issue</Card.Title>
                      <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Header as="h5" className="text-center card-heading">
                      Clinic : Delhi
                    </Card.Header>
                  </Card>
                </Col>
                <Col sm={6} className=" my-4 d-flex justify-content-center">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>Issue</Card.Title>
                      <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Header as="h5" className="text-center card-heading">
                      Clinic : Delhi
                    </Card.Header>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* 
          <Row>
            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Issue</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  Clinic : Delhi
                </Card.Header>
              </Card>
            </Col>

            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Issue</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  Clinic : Delhi
                </Card.Header>
              </Card>
            </Col>
          </Row> */}
        </>
      ) : (
        <>non signin</>
      )}
    </Container>
  );
}
