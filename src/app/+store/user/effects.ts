import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../components/users/user.service';
import * as UserActions from './actions';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class  UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  allUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() => {
      return this.userService.getUsers().pipe(
        takeUntil(this.actions$.pipe(ofType(UserActions.loadUsersCancel))),
        map((users) => UserActions.loadUsersSuccess({ users })),
        catchError((err) => [UserActions.loadUsersFailure({ error: err })])
      );
    })
  ));

  detailUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUserDetail),
    switchMap(({ id }) => {
      return this.userService.getUserDetails(id).pipe(
        takeUntil(this.actions$.pipe(ofType(UserActions.loadUserDetailCancel))),
        map((user) => UserActions.loadUserDetailSuccess({ user })),
        catchError((err) => [UserActions.loadUserDetailFailure({ error: err })])
      );
    })
  ));
}
