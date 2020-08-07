export class ScheduledRide {
    id: number;
    date: Date;
    destinationZip: number;
    leavingZip: number;
    route: string;
    message: string;
    user:{id: number,
        username: string     
  };
}
