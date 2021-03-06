import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/backend_setting";

import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function Dashboard() {
  let redirect = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [appointments, setAppointments] = useState(0);
  useEffect(() => {
    axios.get("/client/login").then((res) => {
      setUser(res.data.data);
    });

    axios.get("/client/booking").then((res) => {
      setAppointments(res.data.data);
    });
  }, [setUser]);

  return (
    <Container className="py-3">
      {user ? (
        <>
          <Row>
            <Col sm={6} className="text-center">
              <h4>
                Welcome, {user.firstName} {user.lastName}
              </h4>
            </Col>
            <Col sm={6} className="text-center">
              <Button
                className="float-sm-right"
                onClick={() => {
                  redirect.push("/booking");
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

          {/* <Row>
            <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
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
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  KNOW TREATMENT
                </Card.Header>
              </Card>
            </Col>
          </Row> */}
          <h3 className="text-center">Your Appointments</h3>

          <Row>
            {appointments ? (
              appointments.map((item, idx) => {
                return (
                  <Col sm={6} key={idx} className=" my-4 d-flex justify-content-center">
                    <Card style={{ width: "20rem" }}>
                      <Card.Body>
                        <Card.Title>{Date(Date.parse(item.issueDate) / 1000)}</Card.Title>
                        <Card.Text>Confirmation : {item.confirmed ? "Confirmed" : "Waiting for confirmation"}</Card.Text>
                        <h5>Problem</h5>
                        <p>{item.problem}</p>
                      </Card.Body>
                      <Card.Header as="h5" className="text-center card-heading">
                        DENTAL HEALTH RISK
                      </Card.Header>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <>No appointments</>
            )}

            {/* <Col sm={6} className=" my-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                </Card.Body>
                <Card.Header as="h5" className="text-center card-heading">
                  DENTAL HEALTH RISK
                </Card.Header>
              </Card>
            </Col> */}
          </Row>
        </>
      ) : (
        <>non signin</>
      )}
    </Container>
  );
}
