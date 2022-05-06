import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import HorseDataService from "../services/horse.service";

const HorseList = ({ getHorseId }) => {
  const [horses, setHorses] = useState([]);
  useEffect(() => {
    getHorse();
  }, []);

  const updateHorses = async () => {
    const data = await HorseDataService.getAllHorses();
    console.log(data.docs);
    setHorses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getHorse = async () => {
    const data = await HorseDataService.getAllHorses();
    console.log(data.docs);
    setHorses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await HorseDataService.deleteHorse(id);
    getHorse();
  };

  const randomizer = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomHorse, 100 * i + 100);
    }
  };

  const pickRandomHorse = () => {
    const randomHorse = horses[Math.floor(Math.random() * horses.length)];

    const newHorses = horses.map((horse) =>
      horse === randomHorse
        ? { ...horse, selected: true }
        : { ...horse, selected: false }
    );

    updateHorses(newHorses);
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getHorse}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(horses, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Horse name</th>
            <th>Horse color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {horses.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.horseName}</td>
                <td>{doc.color}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={() => getHorseId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {horses.length > 0 && (
        <>
          <button onClick={randomizer}>Randomize</button>
        </>
      )}
    </>
  );
};

export default HorseList;
