import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/backend_setting";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

const localizer = momentLocalizer(moment);

const apppointments = [
  {
    title: "Appointment 1",
    patient: "Sitaraman",
    isNeostar: false,
    time: "2:30pm",
  },
  {
    title: "Appointment 2",
    patient: "Mitesh",
    isNeostar: true,
    time: "5:30pm",
  },
];

const events = [
  {
    start: moment("07-18-2021").toDate(),
    end: moment("07-18-2021").add(1, "days").toDate(),
    title: "Appointment 1",
  },
  {
    start: moment("07-20-2021").toDate(),
    end: moment("07-21-2021").add(1, "days").toDate(),
    title: "Appointment 2",
  },
  {
    start: moment("07-24-2021").toDate(),
    end: moment("07-24-2021").add(1, "days").toDate(),
    title: "Appointment 3",
  },
];
const MyCalendar = (props) => (
  <div>
    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
  </div>
);

export default function DoctorDashboad() {
  let redirect = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [section, setSection] = useState(0);
  useEffect(() => {
    axios.get("/doctor/login").then((res) => {
      setUser(res.data.data);
    });
  }, [setUser]);

  return (
    <Container className="py-3">
      {user ? (
        <>
          <Row>
            <Col className="text-center">
              <h4>Welcome, Dr. ABCD</h4>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <button className={section === 0 ? `toggle-button mx-2 active` : `toggle-button mx-2`} onClick={() => setSection(!section)}>
              Calendar
            </button>
            <button className={section === 1 ? `toggle-button mx-2 active` : `toggle-button mx-2`} onClick={() => setSection(!section)}>
              Patients
            </button>
          </Row>

          <Row className="my-4">
            <Col>
              <MyCalendar />
            </Col>
          </Row>

          <h5 className="mt-4">Today's appointments</h5>

          {apppointments.map((apppointment, index) => (
            <Card key={index} className={apppointment.isNeostar ? `appointment-card my-2 neostar` : `appointment-card my-2`}>
              <Row className="align-items-center">
                <Col xs={3} className="border-right">
                  <h6 className="m-0">2:30 pm</h6>
                </Col>

                <Col>
                  <h6>Name of patient</h6>
                  <p className="text-muted m-0">Appointment 1</p>
                </Col>
              </Row>
            </Card>
          ))}
          {/* <Row>
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
                <Col xs={12}>
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
          </Row> */}
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
