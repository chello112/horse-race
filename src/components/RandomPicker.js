import React, { useState } from "react";

const defaultItems = JSON.parse(localStorage.getItem("participants")) || [];

const storeToStorage = (participants) => {
  localStorage.setItem("participants", JSON.stringify(participants));
};

function RandomPicker() {
  const [participants, setParticipants] = useState(defaultItems);
  const [inputValue, setInputValue] = useState("");

  const updateParticipants = (newParticipants) => {
    storeToStorage(newParticipants);

    // update State
    setParticipants(newParticipants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      const newParticipant = {
        text: inputValue,
        selected: false,
      };

      const newParticipants = [...participants, newParticipant];

      updateParticipants(newParticipants);
      setInputValue("");
    }
  };

  const randomizer = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomParticipant, 100 * i + 100);
    }
  };

  const pickRandomParticipant = () => {
    const randomParticipant = participants[Math.floor(Math.random() * participants.length)];

    const newParticipants = participants.map((participant) =>
    participant === randomParticipant
        ? { ...participant, selected: true }
        : { ...participant, selected: false }
    );

    updateParticipants(newParticipants);
  };

  const removeParticipant = (i) => {
    const newParticipants = participants.filter((_, index) => index !== i);

    updateParticipants(newParticipants);
  };

  return (
    <>
      <h1>Winner announcer</h1>
      <div className="container bg-white mx-auto shadow-lg w-full sm:w-2/4 h-auto p-6">
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="py-2 px-4 border border-gray-500 flex-1"
            type="text"
            placeholder="Add a new horse"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className="bg-blue-500 border border-blue-500 hover:bg-blue-700 text-white py-2 px-4">
            Add
          </button>
        </form>

        <ul>
          {participants.map((participant, index) => (
            <li
              className={`select cursor-pointer hover:bg-orange-300 my-3 p-2 ${
                participant.selected ? "bg-orange-500 text-white" : ""
              }`}
              onDoubleClick={() => removeParticipant(index)}
              key={index}
            >
              {participant.text}
            </li>
          ))}
        </ul>

        {participants.length > 0 && (
          <>
            <button onClick={randomizer}>View winner</button>
            <small>* Double click to remove horse from the list</small>
          </>
        )}
      </div>
    </>
  );
}

export default RandomPicker;
