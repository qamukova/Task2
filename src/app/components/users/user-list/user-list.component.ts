import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../+store';
import * as UserActions from '../../../+store/user/actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: any[];

  bundles = [
    {
      dispatchRequest: () => this.store.dispatch(UserActions.loadUsers()),
      dispatchRequestCancel: () => this.store.dispatch(UserActions.loadUsersCancel()),
      requestSuccess$: this.actions$.pipe(ofType(UserActions.loadUsersSuccess)),
      requestFailure$: this.actions$.pipe(ofType(UserActions.loadUsersFailure))
    }
  ];

  constructor(
    private  store: Store<IAppState>,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.user.allUsers).subscribe((users) => this.users = users);
  }

  removeUsersList(): any[] {
    return this.users = [];
  }

  ngOnDestroy() {
    this.store.dispatch(UserActions.loadUsersCancel());
  }

}
