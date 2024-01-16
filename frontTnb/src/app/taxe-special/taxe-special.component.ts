import { Component, OnInit } from '@angular/core';
import {TaxeTNB} from "../models/taxetnb.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Terrain} from "../models/terrain.model";
import {AuthService} from "../_services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../_services/token-storage.service";
import {forkJoin} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-taxe-special',
  templateUrl: './taxe-special.component.html',
  styleUrls: ['./taxe-special.component.css']
})
export class TaxeSpecialComponent implements OnInit {
  taxes: TaxeTNB[] = [];

  public taxe?: TaxeTNB;
  taxeForm: FormGroup;
  terrains: Terrain[] = [];
  showForm: boolean = false;

  isLoggedIn = false;
  //  public terrain?: Terrain;

  constructor(private taxeTnbService: AuthService, private modalService: NgbModal
      ,private tokenStorageService: TokenStorageService,private formBuilder: FormBuilder,  private route: ActivatedRoute, // Include ActivatedRoute in the constructor
              private router: Router) {
    this.taxeForm = this.formBuilder.group({
      tauxTerrain: ['', Validators.required],
      surface: ['', Validators.required],
      annee: ['', Validators.required],
      montantPaye: ['', Validators.required],
      terrain: [null, Validators.required],
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const cin = params['cin']; // assuming 'cin' is the parameter name in your route

      if (cin) {
        // Now you can use 'cin' in your service call
        this.loadAllTaxes(cin);
      } else {
        console.error('CIN parameter not provided.');
      }

     // this.loadCategories();
      //this.loadUsers();
    });



    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.loadAllTaxes();
      this.loadTerrains();
    }
  }
  /*
    openAddTaxModal(): void {
      const modalRef = this.modalService.open(AddTaxeComponent, { centered: true });
      modalRef.componentInstance.onTaxAdded.subscribe((newTax: TaxeTNB) => {
        // Handle the newly added tax (if needed)
        console.log('New Tax Added:', newTax);
      });
    }*/
  /*
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
    }*/
  loadAllTaxes(cin:string): void {
    this.taxeTnbService.findHistoriqueByCIN(cin).subscribe(
        (data) => {
          this.taxes = data;
        },
        (error) => {
          console.error('Error loading taxes', error);
        }

    );
  }

  loadTerrains() {
    this.taxeTnbService.getAllTerrains().subscribe(
        (terrains: Terrain[]) => {
          this.terrains = terrains;
        },
        (error) => {
          console.error('Error loading terrains:', error);
        }
    );
  }

/*
  showAddForm() {
    this.showForm = true;
  }

  onSubmit() {
    forkJoin([
      this.taxeTnbService.getAllTerrains()
    ]).subscribe(([terrains]) => {
      this.terrains = terrains;
      const tauxTerrainValue = this.taxeForm.get('tauxTerrain')?.value;
      const surfaceValue = this.taxeForm.get('surface')?.value;
      const anneeValue = this.taxeForm.get('annee')?.value;
      const montantPayeValue = this.taxeForm.get('montantPaye')?.value;
      const terrainValue = this.taxeForm.get('terrain')?.value;

      console.log('Received tauxTerrain:', tauxTerrainValue);
      console.log('Received surface:', surfaceValue);

      console.log('Selected anneeValue:', anneeValue);
      console.log('Selected terrainValue:', terrainValue);

      if (surfaceValue !== undefined && tauxTerrainValue !== undefined && anneeValue !== undefined && montantPayeValue !== undefined && terrainValue !== undefined) {
        //const selectedCategory = this.categories.find(category => category.id === +categorieValue);
        const selectedTerrain = this.terrains.find(terrain => terrain.terrainID === +terrainValue);

        //console.log('Selected category:', selectedCategory);

        if (selectedTerrain) {
          const taxeData: TaxeTNB = {
            tauxTerrain: tauxTerrainValue,
            surface: surfaceValue,
            annee: anneeValue,
            montantPaye: montantPayeValue,
            terrain: selectedTerrain
          };

          console.log('Taxe data to be sent:', taxeData);

          this.taxeTnbService.createTaxe(taxeData).subscribe(response => {
            console.log('Taxe créé avec succès :', response);
            // Add additional actions as needed
            // Close the form
            this.showForm = false;

            // Clear the form
            this.taxeForm.reset();

            // Reload the list of terrains
            this.loadAllTaxes();
          });
        } else {
          console.error('Selected terrain not found.');
        }

      }
    });
  }

 */
  }


