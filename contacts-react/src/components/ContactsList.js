import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveContacts,
  findContactsByName,
  deleteAllContacts,
} from "../actions/contacts";

const ContactsList = () => {
  const [currentContact, setCurrentContact] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveContacts());
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const refreshData = () => {
    setCurrentContact(null);
    setCurrentIndex(-1);
  };

  const setActiveContact = (contact, index) => {
    setCurrentContact(contact);
    setCurrentIndex(index);
  };

  const removeAllContacts = () => {
    dispatch(deleteAllContacts())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findContactsByName(searchName));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Contact List</h4>

        <ul className="list-group">
          {contacts &&
            contacts.map((contact, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveContact(contact, index)}
                key={index}
              >
                {contact.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllContacts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentContact ? (
          <div>
            <h4>Contact</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentContact.name}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentContact.phone}
            </div>
            <div>
              <label>
                <strong>Favorite:</strong>
              </label>{" "}
              {currentContact.favorite ? "fave" : "n/a"}
            </div>

            <Link
              to={"/contacts/" + currentContact.id}
              className="badge badge-warning edit-form"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contact...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;