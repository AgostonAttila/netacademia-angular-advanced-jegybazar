import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {
  ngOnInit() {
    this.form = this.fb.group(
      {
        bid: [null,Validators.required]
      }
    );
  }

  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {

  }

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    console.log( this.form.value);
 
  }


}
