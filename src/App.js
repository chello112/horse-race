import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddHorse from "./components/AddHorse";
import HorseList from "./components/HorseList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RandomPicker from "./components/RandomPicker";
import Race from "./components/race-events/Race";
import Modal from "./components/Modal";

function App() {
  const [horseId, setHorseId] = useState("");

  const getHorseIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setHorseId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Horse Race Betting System</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Race />
      </Container>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddHorse id={horseId} setHorseId={setHorseId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <HorseList getHorseId={getHorseIdHandler} />
          </Col>
        </Row>
      </Container>
      <Container>
        <RandomPicker />
      </Container>
    </>
  );
}

export default App;
