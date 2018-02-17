import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bidMinimumValidator } from './bid.validators';
import { BidService } from '../../shared/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit {
  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccesAlert = false;
  submitErrorAlert = false;

  constructor(private fb: FormBuilder, private bidService: BidService) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        // bid: [null,Validators.required]
        bid: [null, Validators.compose([Validators.required, bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)])]
      }
    );

    //this.form.get('bid').valueChanges.subscribe(val=>console.log(val)); figyelem az értéket
    //this.form.valueChanges.subscribe(val=>console.log(val));
  }

  /*
  testMethod(){
    this.form.addControl('bid2',new FormControl())
  }*/

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    this.submitSuccesAlert = false;
    this.submitErrorAlert = false;

    if (this.form.valid) {
      this.bidService.bid(this.ticket.id, this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
            this.form.reset({ bid: null });
            //notification user
            this.submitSuccesAlert = true;
            //TODO emit output bid
          },
          err => {
            console.log("error");
            this.submitErrorAlert = true;
          }
        );
    }
    console.log(this.form.value);
  }


}
