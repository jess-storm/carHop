import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component'
import { RequestedRidesComponent } from './components/requested-rides/requested-rides.component';
import { RequestedRideDetailsComponent } from './components/requested-rides/requested-ride-details/requested-ride-details.component'
import { AddRideComponent } from './components/requested-rides/add-ride/add-ride.component';
import { ScheduledRidesComponent } from './components/scheduled-rides/scheduled-rides.component';
import { AddScheduledRideComponent } from './components/scheduled-rides/add-scheduled-ride/add-scheduled-ride.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { AllUsersProfileComponent } from './components/profile/all-users-profile/all-users-profile.component';
import { CarComponent } from './components/car/car.component';
import { ScheduledRidesDetailsComponent } from './components/scheduled-rides/scheduled-rides-details/scheduled-rides-details.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';
import { UpdateScheduledComponent } from './components/scheduled-rides/update-scheduled/update-scheduled.component';
import { ReviewComponent } from './components/review/review.component';
import { CovidComponent } from './components/covid/covid.component';
import { UpdateRequestedComponent } from './components/requested-rides/update-requested/update-requested.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { FindAllUsersComponent } from './components/profile/find-all-users/find-all-users.component';



const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: SignupComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/findAll', component: FindAllUsersComponent},
  {path: 'profile/edit', component: EditProfileComponent},
  {path: 'profile/:id', component: AllUsersProfileComponent},
  {path: 'requested_trips', component: RequestedRidesComponent},
  {path: 'requested_trips/:user_id/create', component: AddRideComponent},
  {path: 'requested_trips/:id', component: RequestedRideDetailsComponent},
  {path: 'requested_trips/:id/update', component: UpdateRequestedComponent},
  {path: 'outgoing_trips', component: ScheduledRidesComponent},
  {path: 'outgoing_trips/:user_id/create', component: AddScheduledRideComponent},
  {path: 'outgoing_trips/:id', component: ScheduledRidesDetailsComponent},
  {path: 'outgoing_trips/:id/update', component: UpdateScheduledComponent},
  {path: 'car/:id', component: CarComponent},
  {path: 'car/:id/update', component: UpdateCarComponent},
  {path: 'car/:user_id/create', component: AddCarComponent},
  {path: 'reviews/:user_id/user', component: ReviewComponent},
  {path: 'reviews/:user_id/create', component: AddReviewComponent},
  {path: 'covid', component: CovidComponent},
  {path: 'send-mail', component: SendEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
