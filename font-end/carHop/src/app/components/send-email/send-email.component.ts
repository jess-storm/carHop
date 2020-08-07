import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';
import { EmailServiceService } from 'src/app/service/email-service/email-service.service';
import { Email } from 'src/app/class/email/email';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  email: Email = new Email();
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  constructor(private router: Router, private emailService: EmailServiceService) { }

  ngOnInit(): void {
  }

  newEmail(): void {
    this.submitted = false;
    this.email = new Email();
  }

  onSubmit(): void {
    this.submitted = true;
    this.emailService.create(this.email).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        this.reloadPage
      },
      err => {
        this.isSuccessful = true;
        this.isFailed = false;
        this.reloadPage
      });
      this.reloadPage
      this.email = new Email();
  }
  reloadPage(): void {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
