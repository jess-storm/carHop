import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/class/review/review';
import { ReviewService } from 'src/app/service/review/review.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  review: Review = new Review();
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  currentUser: any;

  constructor(private token: TokenStorageService, private route: ActivatedRoute, private router: Router, public reviewService: ReviewService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  newReview(): void {
    this.submitted = false;
    this.review = new Review();
  }

  onSubmit(): void {
    this.submitted = true;
    const id: number = +this.route.snapshot.paramMap.get('user_id');
    console.log(id);
    this.reviewService.create(id, this.review).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
        this.reloadPage
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      });
      this.review = new Review();
  }
  reloadPage(): void {
    this.router.navigate(['/requested_trips']).then(() => {
      window.location.reload();
    });
  }
}
