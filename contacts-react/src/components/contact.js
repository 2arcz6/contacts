import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateContact, deleteContact } from "../actions/contacts";
import ContactDataService from "../services/ContactService";

const Contact = (props) => {
  const initialContactState = {
    id: null,
    name: "",
    phone: "",
    favorite: false
  };
  const [currentContact, setCurrentContact] = useState(initialContactState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getContact = id => {
    ContactDataService.get(id)
      .then(response => {
        setCurrentContact(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getContact(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentContact.id,
      name: currentContact.name,
      phone: currentContact.phone,
      favorite: status
    };

    dispatch(updateContact(currentContact.id, data))
      .then(response => {
        console.log(response);

        setCurrentContact({ ...currentContact, favorite: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateContact(currentContact.id, currentContact))
      .then(response => {
        console.log(response);

        setMessage("The Contact was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeContact = () => {
    dispatch(deleteContact(currentContact.id))
      .then(() => {
        props.history.push("/contacts");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentContact ? (
        <div className="edit-form">
          <h4>Contact</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={currentContact.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentContact.favorite ? "fave" : "n/a"}
            </div>
          </form>

          {currentContact.favorite ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              n/a
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Fave
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeContact}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Contact...</p>
        </div>
      )}
    </div>
  );
};

export default Contact;