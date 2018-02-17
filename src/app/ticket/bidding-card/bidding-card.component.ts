import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent   {
  @Input() ticket: TicketModel;  
  @Input() isLoggedIn:boolean;
  onBidWithBidStep() {
    alert('gombnyomas');
  }
}
