import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  terrains: any[] = []; // Define the type of your terrain data
  cin?: string;

  isLoggedIn = false;

  constructor(private terrainsService: AuthService, private tokenStorageService: TokenStorageService
              ,private router: Router,  // Inject the Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.cin = user.cin;
      this.loadTerrains();  // Call loadTerrains after setting this.cin
    }
  }

  redirectToTaxeTnbComponent(): void {
    this.router.navigate(['/taxetnb']);  // Navigate to the TaxeTnbComponent route
  }

  loadTerrains(): void {
    if (this.cin) {
      this.terrainsService.getTerrainsByCIN(this.cin)
        .subscribe(data => {
          this.terrains = data;
        });
    } else {
      console.error('CIN not available.'); // Handle the case where CIN is not available
    }
  }
}
