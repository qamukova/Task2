import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../+store';
import * as UserActions from '../../../+store/user/actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  dependency$: Observable<any>[] = [of(this.activatedRoute.snapshot.params.id)];
  // id: string;
  user: any;

  bundles = [
    {
      dispatchRequest: (dependencies) => {
        const [id] = dependencies[0];
        this.store.dispatch(UserActions.loadUserDetail({ id }));
      },
      dispatchRequestCancel: () => this.store.dispatch(UserActions.loadUserDetailCancel()),
      requestSuccess$: this.actions$.pipe(ofType(UserActions.loadUserDetailSuccess)),
      requestFailure$: this.actions$.pipe(ofType(UserActions.loadUserDetailFailure)),
      dependencies: this.dependency$
    }
  ];

  constructor(
    private  store: Store<IAppState>,
    private actions$: Actions,
    private activatedRoute: ActivatedRoute
  ) {
    // this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // this.store.dispatch(UserActions.loadUserDetail({ id: this.id }));
    this.store.select(state => state.user.userDetails).subscribe((user) => this.user = user );
  }

  removeUserDetail() {
    return this.user = { };
  }

  ngOnDestroy() {
    this.store.dispatch(UserActions.loadUserDetailCancel());
  }
}
