import { createAction, props } from '@ngrx/store';

export const ActionTypes = {
  LoadAll: '[USER] LoadAll',
  LoadAllSuccess: '[USER] LoadAllSuccess',
  LoadAllFailed: '[USER] LoadAllFailed',
  LoadAllCancel: '[USER] LoadAllCancel',

  LoadDetail: '[USER] LoadDetail',
  LoadDetailSuccess: '[USER] LoadDetailSuccess',
  LoadDetailFailed: '[USER] LoadDetailFailed',
  LoadDetailCancel: '[USER] LoadDetailCancel'
};

export const loadUsers = createAction(
  ActionTypes.LoadAll
);
export const loadUsersSuccess = createAction(
  ActionTypes.LoadAllSuccess,
  props<{ users: any }>()
);
export const loadUsersFailure = createAction(
  ActionTypes.LoadAllFailed,
  props<{ error: any }>()
);
export const loadUsersCancel = createAction(
  ActionTypes.LoadAllCancel
);


export const loadUserDetail = createAction(
  ActionTypes.LoadDetail,
  props<{ id: string }>()
);
export const loadUserDetailSuccess = createAction(
  ActionTypes.LoadDetailSuccess,
  props<{ user: any }>()
);
export const loadUserDetailFailure = createAction(
  ActionTypes.LoadDetailFailed,
  props<{ error: any }>()
);
export const loadUserDetailCancel = createAction(
  ActionTypes.LoadDetailCancel
);
