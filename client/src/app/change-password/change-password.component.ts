import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: UserService) {}

  onSubmit(): void {
    // Check if new password and confirm password match
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    // Call changePassword method with currentPassword, newPassword, and confirmPassword
    this.authService
      .changePassword(this.currentPassword, this.newPassword, this.confirmPassword)
      .subscribe(
        (response) => {
          this.successMessage = 'Password changed successfully!';
          this.errorMessage = '';
          this.showMessage('success');
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'An error occurred while changing the password.';
          this.successMessage = '';
          this.showMessage('error');
        }
      );
  }

  showMessage(status: string): void {
    const modal = document.getElementById('messageModal')!;
    const messageText = document.getElementById('messageText')!;
    const modalTitle = document.getElementById('modalTitle')!;
    
    if (status === 'success') {
      modalTitle.textContent = 'Password Change Successful';
      messageText.textContent = 'Your password has been changed successfully.';
    } else {
      modalTitle.textContent = 'Password Change Failed';
      messageText.textContent = 'An error occurred while changing the password.';
    }

    modal.classList.remove('hidden');
  }

  closeModal(): void {
    const modal = document.getElementById('messageModal')!;
    modal.classList.add('hidden');
  }
}
