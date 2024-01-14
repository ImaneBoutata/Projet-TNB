import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../models/user.model';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  userId?: number;
  user?: User;

  constructor(private route: ActivatedRoute, private userService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.userId = user.id;
    this.loadUserDetails();
  }

  loadUserDetails() {
    if (this.userId) {
      this.userService.findById(this.userId)
        .subscribe(data => {
          this.user = data;
        });
    } else {
      console.error('id not available.'); // Handle the case where CIN is not available
    }
  }

}
