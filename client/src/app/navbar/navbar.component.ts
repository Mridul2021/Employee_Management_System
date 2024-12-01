import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Subscription } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  drawerOpen = false; // State variable to control drawer visibility
  isLoggedIn = false;
  user: any; // Declare the user property

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  eventBusSub?: Subscription;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();
      console.log(this.user);
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        this.drawerOpen = false; // Close the drawer if open
        this.isLoggedIn = false;
        window.location.href = '/login'; // Redirect to login page
      },
      error: (err) => {
        console.error('Logout error:', err);
      },
    });
  }
}
