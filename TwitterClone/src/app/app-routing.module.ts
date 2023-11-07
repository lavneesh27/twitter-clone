import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginFirstComponent } from './login-first/login-first.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'create', component:CreateComponent},
  {path:'profile', component:ProfileComponent},
  {path:'loginFirst', component:LoginFirstComponent},
  {path:'bookmark', component:BookmarkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
