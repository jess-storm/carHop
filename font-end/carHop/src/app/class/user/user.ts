export class User {
    id: number;
    fname: string;
    lname: string;
    email: string;
    username: string;
    password: string;
    roles:[{id: number,
           name: string     
    }];
    car:{
        id: number;
        color: string;
        licensePlate: string;
        make: string;
        model: string;
        year: number;
    }
}