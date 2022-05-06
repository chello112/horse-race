import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Race.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditTableRow from "./EditTableRow";

const Ap = () => {
  const [races, setRaces] = useState(data);
  const [addFormData, setAddFormData] = useState({
    address: "",
    date: "",
  });

  const [editFormData, setEditFormData] = useState({
    address: "",
    date: "",
  });

  const [editRaceId, setEditRaceId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newRace = {
      id: nanoid(),
      address: addFormData.address,
      date: addFormData.date,
    };

    const newRaces = [...races, newRace];
    setRaces(newRaces);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedRace = {
      id: editRaceId,
      address: editFormData.address,
      date: editFormData.date,
    };

    const newRaces = [...races];

    const index = races.findIndex((race) => race.id === editRaceId);

    newRaces[index] = editedRace;

    setRaces(newRaces);
    setEditRaceId(null);
  };

  const handleEditClick = (event, race) => {
    event.preventDefault();
    setEditRaceId(race.id);

    const formValues = {
      address: race.address,
      date: race.date,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditRaceId(null);
  };

  const handleDeleteClick = (raceId) => {
    const newRaces = [...races];

    const index = races.findIndex((race) => race.id === raceId);

    newRaces.splice(index, 1);

    setRaces(newRaces);
  };

  return (
    <div className="ap-container">
      <h1 className="title">All races are displayed below</h1>

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <Fragment key={race.id}>
                {editRaceId === race.id ? (
                  <EditTableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    race={race}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add new Race</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Place of occurrence"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="date"
          required="required"
          placeholder="Date"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Ap;
