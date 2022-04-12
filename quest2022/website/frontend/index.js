import React from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from "./App";
import Login from "./login.js";
import Rankings from './rankings.js';
import Submit from './submit.js';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/rankings" element={<Rankings />}/>
      <Route path='/submit' element={<Submit />}/>

    </Routes>

  </BrowserRouter>,
  rootElement
);