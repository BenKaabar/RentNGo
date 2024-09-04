import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Services/Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Check if either admin or client is logged in
    if (this.authService.isAdminLoggedIn() || this.authService.isClientLoggedIn()) {
      return true;
    } else {
      // Redirect to the login page (admin or client)
      this.router.navigate(['/SignIn']);
      return false;
    }
  }
}
