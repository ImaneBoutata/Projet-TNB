import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Categorie } from '../models/categorie.model';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {


  terrainForm: FormGroup;
  categories: Categorie[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private terrainService: AuthService
  ) {
    this.terrainForm = this.formBuilder.group({
      surface: ['', Validators.required],
      categorie: [null, Validators.required] // Initialize categorie as a FormControl
    });
  }




  ngOnInit(): void {
    this.loadCategories();
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

  onSubmit() {
    if (this.terrainForm.valid) {
      const terrainData = this.terrainForm.value;
      this.terrainService.createTerrain(terrainData).subscribe(response => {
        console.log('Terrain créé avec succès :', response);
        // Ajoutez des actions supplémentaires selon vos besoins
      });
    }
  }
}
