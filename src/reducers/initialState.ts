export interface IContact {
  id?: number,
  name: string,
  lastname: string,
  contrycode: string,
  phone: string
}

export interface IForm {
  state: string,
  edit: number | null,
  data: IContact,
  bulk: Array<number>
};
export default interface IState {
  readonly version: string,
  state: string,
  form: IForm,
  contacts: Array<IContact>
};

export const initialState: IState = {
  version: '0.1',
  state: 'idle', // Global machine
  form: {
    state: 'closed',
    edit: null,
    bulk: [],
    data: {
      name: '',
      lastname: '',
      contrycode: '',
      phone: ''
    }
  },
  contacts: []
};