import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Categorie } from '../models/categorie.model';
import { Terrain } from '../models/terrain.model';
import { User } from '../models/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {


  terrainForm: FormGroup;
  categories: Categorie[] = [];
  users: User[] = [];


  terrains: Terrain[] = [];
  public terrain?: Terrain;


  showForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private terrainService: AuthService
  ) {
    this.terrainForm = this.formBuilder.group({
      surface: ['', Validators.required],
      categorie: [null, Validators.required], // Initialize categorie as a FormControl
      user: [null, Validators.required] // Initialize categorie as a FormControl
    });
  }




  ngOnInit(): void {
    this.loadCategories();
    this.loadTerrains();
    this.loadUsers();
    // this.loadTerrains();
  }
  loadTerrains() {
    this.terrainService.getAllTerrains().subscribe(
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
  }



}
















