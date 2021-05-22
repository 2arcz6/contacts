import {
    CREATE_CONTACT,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    DELETE_ALL_CONTACTS,
  } from "./types";
  
  import ContactDataService from "../services/ContactService";
  
  export const createContact = (name, phone) => async (dispatch) => {
    try {
      const res = await ContactDataService.create({ name, phone });
        console.log(res)
      dispatch({
        type: CREATE_CONTACT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveContacts = () => async (dispatch) => {
    try {
      const res = await ContactDataService.getAll();
  
      dispatch({
        type: RETRIEVE_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateContact = (id, data) => async (dispatch) => {
    try {
      const res = await ContactDataService.update(id, data);
  
      dispatch({
        type: UPDATE_CONTACT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteContact = (id) => async (dispatch) => {
    try {
      await ContactDataService.remove(id);
  
      dispatch({
        type: DELETE_CONTACT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllContacts = () => async (dispatch) => {
    try {
      const res = await ContactDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_CONTACTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findContactsByName = (name) => async (dispatch) => {
    try {
      const res = await ContactDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };