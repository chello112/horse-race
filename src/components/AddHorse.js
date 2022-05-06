import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import HorseDataService from "../services/horse.service";

const AddHorse = ({ id, setHorseId }) => {
  const [horseName, setHorseName] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();                    
    setMessage("");
    if (horseName === "" || color === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newHorse = {
      horseName,
      color,
    };
    console.log(newHorse);

    try {
      if (id !== undefined && id !== "") {
        await HorseDataService.updateHorse(id, newHorse);
        setHorseId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await HorseDataService.addHorse(newHorse);
        setMessage({ error: false, msg: "New Horse added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
   

    setHorseName("");
    setColor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await HorseDataService.getHorse(id);
      console.log("the record is :", docSnap.data());
      setHorseName(docSnap.data().title);
      setColor(docSnap.data().author);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
  
    <>
     <hr></hr>
      <div className="p-6 box">
      
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formHorseName">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Horse name"
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHorseColor">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Horse color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddHorse;
