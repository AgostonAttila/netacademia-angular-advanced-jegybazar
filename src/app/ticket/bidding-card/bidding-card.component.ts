import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent implements OnChanges {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: Boolean;
  @Output() bid = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] != null &&
      changes['ticket'].isFirstChange() &&
      changes['ticket'].currentValue != null) {
      this.loading = false;
    }
  }

  // tslint:disable-next-line:member-ordering
  loading = false;

  onBidWithBidStep() {
    this.loading = true;
    this.bid.emit();
  }
}
