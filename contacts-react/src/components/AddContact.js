import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../actions/contacts";

const AddContact = () => {
  const initialContactState = {
    id: null,
    name: "",
    phone: "",
    favorite: false
  };
  const [contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const saveContact = () => {
    const { name, phone } = contact;

    dispatch(createContact(name, phone))
      .then(data => {
        setContact({
          id: data.id,
          name: data.name,
          phone: data.phone,
          favorite: data.favorite
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newContact = () => {
    setContact(initialContactState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You added successfully!</h4>
          <button className="btn btn-success" onClick={newContact}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={contact.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={contact.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <button onClick={saveContact} className="btn btn-success add-btn">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContact;