// import './App.css';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import List from "./components/ListToDo";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import TutorialDataService from "./serviceapi/serviceApi";

function App() {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const initialActivityState = {
    title: "coba 2",
    email: "tes@io.com",
  };

  const saveActivity = () => {
    var data = {
      title: "coba2",
      email: "tes@io.com",
    };
    TutorialDataService.createActivityGroup(data)
      .then((response) => {
        initialActivityState({
          title: response.data.title,
          email: response.data.email,
        });

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  return (
    <>
      <Navbar />
      <Modal show={modal} close={Toggle} />
      <div
        className="grid grid-cols-6 gap-4 mt-20"
        data-cy="activity-add-button"
      >
        <div className="col-start-2 col-end-3 text-3xl font-bold">Activity</div>
        <div className="col-end-7 col-span-2 ...">
          <button
            type="button"
            className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-white bg-[#16ABF8] "
            onClick={saveActivity}
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<List />} />
          {/* <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
