import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestedRidesComponent } from './components/requested-rides/requested-rides.component';
import { AddRideComponent } from './components/requested-rides/add-ride/add-ride.component';
import { ScheduledRidesComponent } from './components/scheduled-rides/scheduled-rides.component';
import { AddScheduledRideComponent } from './components/scheduled-rides/add-scheduled-ride/add-scheduled-ride.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { RequestedRideDetailsComponent } from './components/requested-rides/requested-ride-details/requested-ride-details.component';
import { AllUsersProfileComponent } from './components/profile/all-users-profile/all-users-profile.component';
import { CarComponent } from './components/car/car.component';
import { ScheduledRidesDetailsComponent } from './components/scheduled-rides/scheduled-rides-details/scheduled-rides-details.component';
import { ReviewComponent } from './components/review/review.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';
import { CovidComponent } from './components/covid/covid.component';
import { UpdateScheduledComponent } from './components/scheduled-rides/update-scheduled/update-scheduled.component';
import { UpdateRequestedComponent } from './components/requested-rides/update-requested/update-requested.component';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { FindAllUsersComponent } from './components/profile/find-all-users/find-all-users.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    RequestedRidesComponent,
    AddRideComponent,
    ScheduledRidesComponent,
    AddScheduledRideComponent,
    EditProfileComponent,
    RequestedRideDetailsComponent,
    AllUsersProfileComponent,
    CarComponent,
    ScheduledRidesDetailsComponent,
    ReviewComponent,
    AddReviewComponent,
    CovidComponent,
    UpdateScheduledComponent,
    UpdateRequestedComponent,
    UpdateCarComponent,
    AddCarComponent,
    SendEmailComponent,
    FindAllUsersComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
