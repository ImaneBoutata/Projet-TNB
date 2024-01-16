import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../models/categorie.model";
import {User} from "../models/user.model";
import {Terrain} from "../models/terrain.model";
import {AuthService} from "../_services/auth.service";
import {forkJoin} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-terrain-special',
  templateUrl: './terrain-special.component.html',
  styleUrls: ['./terrain-special.component.css']
})
export class TerrainSpecialComponent implements OnInit {
  terrainForm: FormGroup;
  categories: Categorie[] = [];
  users: User[] = [];


  terrains: Terrain[] = [];
  public terrain?: Terrain;


  showForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private terrainService: AuthService,    private route: ActivatedRoute, // Include ActivatedRoute in the constructor
    private router: Router
  ) {
    this.terrainForm = this.formBuilder.group({
      surface: ['', Validators.required],
      categorie: [null, Validators.required], // Initialize categorie as a FormControl
      user: [null, Validators.required] // Initialize categorie as a FormControl
    });
  }


  redirectToTerrainComponant(cin: string): void {
    this.router.navigate(['/taxeSpecial', cin]);}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const cin = params['cin']; // assuming 'cin' is the parameter name in your route

      if (cin) {
        // Now you can use 'cin' in your service call
        this.loadTerrainsByCIN(cin);
      } else {
        console.error('CIN parameter not provided.');
      }

      this.loadCategories();
      this.loadUsers();
    });


    this.loadCategories();
    this.loadUsers();
    // this.loadTerrains();
  }
    loadTerrainsByCIN(cin: string) {
    this.terrainService.getTerrainsByCIN(cin).subscribe(
      (data) => {
        this.terrains = data;
      },
      (error) => {
        console.error('Error loading terrains', error);
      }
    );
  }

  loadCategories() {
    this.terrainService.getAllCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadUsers() {
    this.terrainService.getAllUser().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }


  showAddForm() {
    this.showForm = true;
  }



  // ...
/*
  onSubmit() {
    forkJoin([
      this.terrainService.getAllCategories(),
      this.terrainService.getAllUser()
    ]).subscribe(([categories, users]) => {
      this.categories = categories;
      this.users = users;

      const surfaceValue = this.terrainForm.get('surface')?.value;
      const categorieValue = this.terrainForm.get('categorie')?.value;
      const userValue = this.terrainForm.get('user')?.value;

      console.log('Received categories:', categories);
      console.log('Received users:', users);

      console.log('Selected category ID:', categorieValue);
      console.log('Selected user ID:', userValue);

      if (surfaceValue !== undefined && categorieValue !== undefined && userValue !== undefined) {
        const selectedCategory = this.categories.find(category => category.id === +categorieValue);
        const selectedUser = this.users.find(user => user.id === +userValue);

        console.log('Selected category:', selectedCategory);
        console.log('Selected user:', selectedUser);

        if (selectedCategory && selectedUser) {
          const terrainData: Terrain = {
            surface: surfaceValue,
            categorie: selectedCategory,
            proprietaire: selectedUser
          };

          console.log('Terrain data to be sent:', terrainData);

          this.terrainService.createTerrain(terrainData).subscribe(response => {
            console.log('Terrain créé avec succès :', response);
            // Add additional actions as needed
            // Close the form
            this.showForm = false;

            // Clear the form
            this.terrainForm.reset();

            // Reload the list of terrains
            this.loadTerrains();
          });
        } else {
          console.error('Selected category or user not found.');
        }

      }
    });
  }*/



}











