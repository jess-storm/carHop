import { Time } from '@angular/common';

export class Review {
    id: number;
    author: string;
    date: Date;
    message: string;
    rating: string;
    time: Time;
    title: string;
    user:{id: number,
          username: string     
    };
}
