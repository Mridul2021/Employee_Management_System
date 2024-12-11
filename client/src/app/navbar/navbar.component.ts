import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  drawerOpen = false;
  isLoggedIn = false;
  isAdmin=false;
  user: any;
  role: any;

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
      this.role = this.storageService.getRole();
      if(this.role=="admin")
      {
        this.isAdmin=true;
      }
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        this.drawerOpen = false;
        this.isLoggedIn = false;
        window.location.href = '/login';
      },
      error: (err) => {
        console.error('Logout error:', err);
      },
    });
  }
}
