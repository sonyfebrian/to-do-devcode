import logo from "./logo.svg";
// import './App.css';
import Navbar from "./component/Navbar";
import Main from "./component/Main";
import List from "./component/ListToDo";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
