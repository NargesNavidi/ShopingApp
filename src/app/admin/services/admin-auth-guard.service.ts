import { AppUser } from '../../shared/models/app-user';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
