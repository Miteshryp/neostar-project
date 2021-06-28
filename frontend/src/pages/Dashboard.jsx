import React from "react";

import { useHistory } from "react-router-dom";
import { Container , Row, Col, Button,  Card} from "react-bootstrap";
export default function Dashboard(props) {
  let redirect = useHistory();
  let { state: signin_data } = props.location;

  console.log("DASHBOARD - ")
  console.log(signin_data);

  if (!signin_data) {
    console.error("ERROR: Cannot book an appointment without a signin");
    redirect.push("/signin");
  }

  return (
    <Container className="py-3">
      <Row>
        <Col sm={6} className="text-center" >
          <h4>Welcome, {signin_data.name}</h4>
        </Col>
        <Col sm={6} className="text-center">
          <Button className="float-sm-right" onClick={()=> 
            {redirect.push("/booking", signin_data)}
          }>Book an Appointment</Button>
        </Col>
      </Row>

      <Row>
        <Col>
        <Card className="my-5 mx-4">
        <Card.Header as="h5" className="card-dashboard-heading">DASHBOARD</Card.Header>
            <Card.Body className="text-center card-dashboard-body">
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={6} className=" my-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Header as="h5" className="text-center card-heading">FIND US NEAR YOU</Card.Header>
    
          </Card>
        </Col>
        
        <Col sm={6} className=" my-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Header as="h5" className="text-center card-heading">KNOW TREATMENT</Card.Header>

          </Card>
        </Col>
      </Row>

      
      <Row>
        <Col sm={6} className=" my-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Header as="h5" className="text-center card-heading" >DENTAL HEALTH RISK</Card.Header>
            
          </Card>
        </Col>
        
        <Col sm={6} className=" my-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Header as="h5" className="text-center card-heading" >DENTAL HEALTH RISK</Card.Header>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}