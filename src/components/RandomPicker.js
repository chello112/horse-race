import React, { useState } from "react";

// FUNCTIONALITIES
// input -> save to state ✅
// button (top) -> add to list ✅
// button (bottom) -> trigger the randomizer ✅
// item doubleclick -> remove it ✅
// save to localStorage ✅

const defaultItems = JSON.parse(localStorage.getItem("items")) || [];

const storeToStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

function RandomPicker() {
  const [items, setItems] = useState(defaultItems);
  const [inputValue, setInputValue] = useState("");

  const updateItems = (newItems) => {
    // updated Items in LocalStorage
    storeToStorage(newItems);

    // update State
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      const newItem = {
        text: inputValue,
        selected: false,
      };

      const newItems = [...items, newItem];

      updateItems(newItems);
      setInputValue("");
    }
  };

  const randomizer = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomItem, 100 * i + 100);
    }
  };

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const newItems = items.map((item) =>
      item === randomItem
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );

    updateItems(newItems);
  };

  const removeItem = (i) => {
    const newItems = items.filter((_, index) => index !== i);

    updateItems(newItems);
  };

  return (
    <>
      <h1>Randomizer</h1>
      <div className="container bg-white mx-auto shadow-lg w-full sm:w-2/4 h-auto p-6">
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="py-2 px-4 border border-gray-500 flex-1"
            type="text"
            placeholder="Add a new item"
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
          {items.map((item, index) => (
            <li
              className={`select cursor-pointer hover:bg-orange-300 my-3 p-2 ${
                item.selected ? "bg-orange-500 text-white" : ""
              }`}
              onDoubleClick={() => removeItem(index)}
              key={index}
            >
              {item.text}
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <>
            <button onClick={randomizer}>Randomize</button>
            <small>* Double click to remove an item</small>
          </>
        )}
      </div>
	  
    </>
  );
}

export default RandomPicker;
