// search.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TaxeTNB } from '../models/taxetnb.model';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  users?: User[];
  taxeTNBList?: TaxeTNB[];
  searchForm: FormGroup = this.fb.group({
    selectedUser: new FormControl(null),
  });

  constructor(private dataService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm(): void {
    this.searchForm.get('selectedUser')?.valueChanges.subscribe((selectedUserId) => {
      // No need to load taxeTNB here since it will be triggered by the button click
    });
  }

  loadUsers(): void {
    this.dataService.getAllUser().subscribe(users => {
      this.users = users;
    });
  }

  onLoadTaxeTNB(): void {
    const selectedUserId = this.searchForm.get('selectedUser')?.value;
    if (selectedUserId) {
      const selectedUser = this.users?.find(user => user.id === selectedUserId);
      if (selectedUser) {
        this.loadTaxeTNB(selectedUser.cin);
      }
    }
  }

  loadTaxeTNB(cin: string): void {
    this.dataService.findHistoriqueByCIN(cin).subscribe(taxeTNBList => {
      this.taxeTNBList = taxeTNBList;
    });
  }

}
