// import './App.css';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import List from "./components/ListActivity";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import DetailPage from "./components/DetailPage";
import TutorialDataService from "./serviceapi/serviceApi";

function App() {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const initialActivityState = {
    title: "worht",
    email: "as@io.com",
  };
  const [todo, setTodo] = useState(initialActivityState);

  const saveActivity = () => {
    var data = {
      title: todo.title,
      email: todo.email,
    };
    TutorialDataService.createActivityGroup(data)
      .then((response) => {
        setTodo({
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

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<List />} />
          {/* <Route path="/detail" element={<DetailPage/>} />
          <Route path="/add" element={<AddTutorial />} /> */}
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
