import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TicketModel } from '../../shared/ticket-model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bidMinimumValidator } from './bid.validators';
import { BidService } from '../../shared/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit, OnChanges {
  @Input() ticket: TicketModel;
  @Output() bid = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccesAlert = false;
  submitErrorAlert = false;
  disabled = false;

  constructor(private fb: FormBuilder, private bidService: BidService) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        // bid: [null,Validators.required]
        bid: [null, Validators.compose([Validators.required, bidMinimumValidator(() => { return this.ticket; })])]
      }
    );

    //this.form.get('bid').valueChanges.subscribe(val=>console.log(val)); figyelem az értéket
    //this.form.valueChanges.subscribe(val=>console.log(val));
  }

  /*
  testMethod(){
    this.form.addControl('bid2',new FormControl())
  }*/

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] != null && !changes['ticket'].isFirstChange() && changes['ticket'].currentValue != null) {
      this.disabled = false;
      this.form.reset({ bid: null });
      this.form.get('bid').enable();
    }
  }


  onBidWithBidStep() {
    //this.bidWithBidStep.emit();
    this.toBid(this.ticket.currentBid * this.ticket.bidStep)
      .subscribe(
        () => {
          //notification user
          this.submitSuccesAlert = true;
          this.bid.emit();
          this.form.get('bid').enable();
        },
        err => {
          console.log("error");
          this.submitErrorAlert = true;
        }
      );
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.toBid(this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;        
            //notification user
            this.submitSuccesAlert = true;          
            this.bid.emit();
          },
          err => {
            console.log("error");
            this.submitErrorAlert = true;
          }
        );
    }
    console.log(this.form.value);
  }

  toBid(value: number) {
    this.submitSuccesAlert = false;
    this.submitErrorAlert = false;
    this.form.get('bid').disable();
    this.disabled = true;
    return this.bidService.bid(this.ticket.id, value);
  }


}
