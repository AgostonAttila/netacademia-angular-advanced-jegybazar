import { Injectable } from '@angular/core';
import { TicketService } from './ticket.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class BidService {

  constructor(private ticketService: TicketService, private http: HttpClient) { }

  bid(ticketId: string, value: number) {
    //TODO replace userId
    const userId = 'PRMGhTWYPhRAD0hXEefcojFkDfD2';

    return this.http.put(`${environment.firebase.baseUrl}/bids/${ticketId}/${userId}.json`, value)
      .flatMap(
        () => {
          return this.ticketService.getOne(ticketId);
        }
      )
      .flatMap(
        ticket => {
          return this.ticketService.modify(Object.assign(ticket, { currentBid: value, bidCounter: ++ticket.bidCounter }));
        }
      )


  }

}
