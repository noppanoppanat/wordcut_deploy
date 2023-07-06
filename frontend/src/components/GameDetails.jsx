import React from "react";
import "./GameDetails.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GameDetails(props) {
  return (
    <Container>
      <Row className="justify-content-md-center">
      <Col className="banner-detail-1">✎
 ข้อ : {props.round+1}</Col>
        <Col className="banner-detail-2"> ⏱︎ {props.time} S</Col>
        <Col className="banner-detail-3">
         คะแนน : {props.score}  ✔︎</Col>
        
      </Row>
    </Container>
  );
}

export default GameDetails;
