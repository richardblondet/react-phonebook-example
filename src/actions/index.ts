import * as types from './types';
import { IContact } from '../reducers/initialState';

/* Contacts actions */

/**
 * Add contact
 * @param {Conctact} contact 
 */
export const addContact = (contact:IContact) => ({ type: types.ADD_CONTACT, payload: contact });
export const editContact = (contact:IContact, index:number) => ({ type: types.EDIT_CONTACT, payload: contact, index });
export const saveContact = (contact:IContact, index:number) => ({ type: types.SAVE_CONTACT, payload: contact, index });
export const deleteContact = (id:number) => ({ type: types.REMOVE_CONTACT, payload: id });
export const toggleSelectContact = (id:number) => ({ type: types.TOGGLE_SELECT_CONTACT, payload: id });
export const toggleSelectAllContact = () => ({ type: types.TOGGLE_SELECT_ALL_CONTACT });
export const deleteBulkSelected = () => ({ type: types.REMOVE_BULK_SELECTED });
/* Form actions */

/**
 * Toggle form
 * @param {Boolean} state 
 */
export const toggleForm = (state:string) => ({ type: types.TOGGLE_FORM, payload: state });
export const setFormData = (data:any) => ({ type: types.SET_FORM_DATA, payload: data });