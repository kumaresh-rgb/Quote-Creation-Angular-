import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

// Define an interface for the expected response structure
interface UserDetails {
  users: {
    localId: string;
    displayName: string;
    // Add other properties if available
  }[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = { displayName: "somename" };
  dob: Date | undefined;
  isDateSelected: boolean = false; // This variable will track whether the date is selected

  // Other relevant code

  // Function to toggle visibility based on date selection
  onDateSelected() {
    if (this.dob) {
      this.isDateSelected = true;
    } else {
      this.isDateSelected = false;
    }
  }



  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAccess();

    if (this.auth.isAuthenticated()) {
      //call user details service
      this.auth.detail().subscribe({
        next: (data: UserDetails) => {
          this.user.displayName = data.users[0].displayName;
      
        },
        error: (error: any) => {
          // Handle error appropriately
          console.error('Error fetching user details:', error);
        }
      });
    }
  }
}
