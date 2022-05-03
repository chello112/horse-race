import React, { useState } from "react";
import Modal from "./Modal";
import "./Confirmation.css";

const Confirmation = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="Confirmation">
      <div>
        <h1>This is a gambling site. Would you like to continue?</h1>
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Continue
        </button>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
    </div>
  );
};

export default Confirmation;
