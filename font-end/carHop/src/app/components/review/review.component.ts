import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/service/review/review.service';
import { Review } from 'src/app/class/review/review';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  review: Review[];
  index: number =0;
  currentUser: any;

  constructor(private token: TokenStorageService, public reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const id: number = +this.route.snapshot.paramMap.get('user_id');
    this.reviewService.getByUserId(id).subscribe((data: Review[])=>{
      this.review = data;
    })
  }

}