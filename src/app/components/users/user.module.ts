// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

// Components & Directives
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ResolveDirective } from './resolve.directive';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    ResolveDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserRoutingModule
  ]
})
export class UserModule { }
