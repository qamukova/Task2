import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';

export interface IUserState {
  allUsers: any[];
  userDetails: any;
  errorMessage: string;
}

const initialState: IUserState = {
  allUsers: [],
  userDetails: null,
  errorMessage: ''
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return { ...state, allUsers: users };
  }),
  on(UserActions.loadUsersFailure, (state, { error }) => {
    return { ...state, errorMessage: error };
  }),
  on(UserActions.loadUserDetailSuccess, (state, { user }) => {
    return { ... state, userDetails: user };
  }),
  on(UserActions.loadUserDetailFailure, (state, { error }) => {
    return { ...state, errorMessage: error };
  })
);
