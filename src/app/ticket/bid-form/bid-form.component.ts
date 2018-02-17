import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {
  ngOnInit() {
    this.form = this.fb.group(
      {
        bid: null
      }
    );
  }

  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }
  
  onSubmit(){


  }


}
