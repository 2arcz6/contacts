import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';

import AddContact from "./components/AddContact";
import Contact from "./components/contact";
import ContactsList from "./components/ContactsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/contacts" className="navbar-brand">
          Contacts
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/contacts"} className="nav-link">
              Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/contacts"]} component={ContactsList} />
          <Route exact path="/add" component={AddContact} />
          <Route path="/contacts/:id" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
