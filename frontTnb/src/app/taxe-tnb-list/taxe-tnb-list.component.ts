import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddTaxeComponent } from "../add-taxe/add-taxe.component";
import { TaxeTNB } from "../models/taxetnb.model";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-taxe-tnb-list',
  templateUrl: './taxe-tnb-list.component.html',
  styleUrls: ['./taxe-tnb-list.component.css']
})
export class TaxeTnbListComponent implements OnInit {
    taxes: TaxeTNB[] = [];
    taxeTNB:TaxeTNB;
  isLoggedIn = false;
  constructor(private taxeTnbService: AuthService, private modalService: NgbModal
              ,private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.loadAllTaxes();
    }
  }

  openAddTaxModal(): void {
    const modalRef = this.modalService.open(AddTaxeComponent, { centered: true });
    modalRef.componentInstance.onTaxAdded.subscribe((newTax: TaxeTNB) => {
      // Handle the newly added tax (if needed)
      console.log('New Tax Added:', newTax);
    });
  }

  saveTax(): void {
    this.taxeTnbService.saveTax(this.taxeTNB).subscribe(
      (response) => {
        console.log('Tax saved successfully:', response);
        // Handle success, e.g., show a success message or redirect to a different page
      },
      (error) => {
        console.error('Error saving tax:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
    loadAllTaxes(): void {
        this.taxeTnbService.findAllTaxes().subscribe(
            (taxes: TaxeTNB[]) => {
                this.taxes = taxes;
                console.log('All Taxes:', this.taxes);
            },
            (error) => {
                console.error('Error fetching taxes:', error);
            }
        );
    }
}
