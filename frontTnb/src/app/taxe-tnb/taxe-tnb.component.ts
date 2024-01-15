// src/app/taxe-tnb/taxe-tnb.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {TaxeTNB} from "../models/taxetnb.model";
@Component({
  selector: 'app-taxe-tnb',
  templateUrl: './taxe-tnb.component.html',
  styleUrls: ['./taxe-tnb.component.css']
})
export class TaxeTnbComponent implements OnInit {
  cin: string ="";
  historique: TaxeTNB[] = [];
  isLoggedIn = false;

  constructor(private taxeTnbService: AuthService ,private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.cin = user.cin;
      this.fetchHistoriqueByCIN();  // Call loadTerrains after setting this.cin
    }
  }

  fetchHistoriqueByCIN(): void {
    this.taxeTnbService.findHistoriqueByCIN(this.cin).subscribe(
      data => {
        this.historique = data;
      },
      error => {
        console.error('Error fetching historical data:', error);
      }
    );
  }
}

