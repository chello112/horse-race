import React from "react";

const ReadOnlyRow = ({ race, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{race.address}</td>
      <td>{race.date}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, race)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(race.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;