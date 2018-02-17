import { FormControl } from "@angular/forms";
import { TicketModel } from "../../shared/ticket-model";

//export const valami = ()=>{};
export function bidMinimumValidator(getTicketFn: ()=>TicketModel) {
    return function (formControl: FormControl) {
        const ticket = getTicketFn();
        const minimumValue = this.ticket.currentBid + this.ticket.bidStep;
        if (parseInt(formControl.value, 0) < minimumValue) {
            return {
                'validateMinimumBid': true
            };
        }
    };
}