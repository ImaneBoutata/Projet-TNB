import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaxeTNB} from "../models/taxetnb.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../_services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-taxe',
  templateUrl: './add-taxe.component.html',
  styleUrls: ['./add-taxe.component.css']
})
export class AddTaxeComponent implements OnInit {

  taxeForm: FormGroup;

  @Output() onTaxAdded: EventEmitter<TaxeTNB> = new EventEmitter<TaxeTNB>();
  constructor(public activeModal: NgbActiveModal
              ,private taxetnbService: AuthService,protected fb: FormBuilder) {

    this.taxeForm = this.fb.group({
      id: null,
      tauxTerrain: '',
      surface: '',
      annee: '',
      montantPaye: '',
      paye: ''
    });

  }

  ngOnInit(): void {
  }
  /*
  saveTax(): void {
    // Validate and save the new tax
    // For simplicity, let's emit the new tax directly
    this.onTaxAdded.emit(this.newTax);
    this.activeModal.close();
  }*/

  saveTax(newTax:any){
    console.log(newTax);
    this.taxetnbService.postTaxes(newTax).subscribe((newTax) => {
      }, (error) => { console.log(error)}, () => {

      });
    }

}
