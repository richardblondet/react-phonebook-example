import IState, { initialState } from './initialState';
import * as types from '../actions/types';

export interface IAction {
  type: string,
  payload: any
};

interface IHandlers {
  [index:string]:Function
};

const EMPTY_FORM_DATA = {
  name: "",
  lastname: "",
  contrycode: "",
  phone: ""
};
/**
 * Manage the state actions for the application store context
 * 
 * @param state @interface State
 * @param action @interface Action
 */
const initReducers = (handlers:IHandlers) => (state: IState = initialState, action: IAction): IState => {
  
  /** Observe ongoing action */
  console.log("%c Reducer action: %s", "font-weight: bold; color: #6B5ADF;", action.type.toUpperCase(), action.payload );
  
  if ( !handlers.hasOwnProperty(action.type) ){
    return state;
  }
  
  return handlers[action.type](state, action);
};

/**
 * Initializes app handlers
 * 
 * @param handlers @interface IHandlers
 */
const Reducer = initReducers({
  [types.ADD_CONTACT]: (state:IState, data:any) => {
    const newState = {...state};
    
    // Perform add
    newState.contacts.push(data.payload);

    // Clean the form
    newState.form.data = EMPTY_FORM_DATA;

    return {...state, ...newState};
  },
  [types.EDIT_CONTACT]: (state:IState, data:any) => ({ 
    ...state,
    form: {
      ...state.form,
      edit: data.payload.index,
      data: data.payload
    }
  }),
  [types.SAVE_CONTACT]: (state:IState, data:any) => {
    const newState = {...state};
    const { name, lastname, contrycode, phone } = data.payload;
    
    // Perform save
    newState.contacts.splice(data.index, 1, {
      name,
      lastname,
      contrycode,
      phone
    });

    // Clean the form
    newState.form.data = EMPTY_FORM_DATA;
    newState.form.edit = null;
    
    return {...state, ...newState};
  },
  [types.REMOVE_CONTACT]: (state:IState, data:any) => {
    const newState = {...state};
    
    // Perform remove
    newState.contacts.splice(data.payload, 1);
    
    return {...state, ...newState};
  },
  [types.TOGGLE_SELECT_CONTACT]: (state:IState, data:any) => {
    const newState = {...state};
    
    // If exists remove it else add it
    if (newState.form.bulk.includes(data.payload)) {
      newState.form.bulk.splice(newState.form.bulk.indexOf(data.payload), 1);
    } else {
      newState.form.bulk.push(data.payload);
    }
    
    return {...state, ...newState};
  },
  [types.TOGGLE_SELECT_ALL_CONTACT]: (state:IState) => {
    const newState = {...state};
    
    // If they are same length empty it or otherwise
    if (newState.form.bulk.length === newState.contacts.length) {
      newState.form.bulk = [];
    } else {
      newState.form.bulk = newState.contacts.map((c, i) => i);
    }
    
    return {...state, ...newState};
  },
  [types.REMOVE_BULK_SELECTED]: (state:IState) => {
    const newState = {...state};
    
    // Grab contacts not selected
    const unSelectedContacts = newState.contacts.filter((contact, index) => !newState.form.bulk.includes(index));
    // save this not selected in the array
    newState.contacts = unSelectedContacts;
    // clean bulk selection
    newState.form.bulk = [];
    
    return {...state, ...newState};
  },
  [types.TOGGLE_FORM]: (state:IState, data:any) => ({
    ...state,
    form: {
      ...state.form,
      state: data.payload
    }
  }),
  [types.SET_FORM_DATA]: (state:IState, data:any) => ({
    ...state,
    form: {
      ...state.form,
      data: {
        ...state.form.data,
        ...data.payload
      }
    }
  })
});

export {
  Reducer,
  initialState
};