export class RequestedRide {
    id: number;
    date: Date;
    destinationZip: number;
    leavingZip: number;
    message: string;
    user:{id: number,
          username: string     
    };
}
