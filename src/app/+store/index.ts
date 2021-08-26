import { IUserState, reducer as userReducer } from './user/reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  user: IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
  user: userReducer
};
