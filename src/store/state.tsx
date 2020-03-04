import React, { useReducer, useContext, Dispatch } from 'react';
import IState from '../reducers/initialState';
import { IAction } from '../reducers/';

interface IContextProps {
  state: IState;
  dispatch: Dispatch<IAction>;
}

/**
 * 
 * @see {@link https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c} 
 */

const State:any = React.createContext({});

export const StateProvider:any = ({ reducer, initialState, children }: { reducer: any, initialState: any,  children: React.ReactNode }): React.ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <State.Provider value={value}>
      {children}
    </State.Provider>
  );
};

export default State;

export const useStateValue = () => useContext(State);