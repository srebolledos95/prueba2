import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicio/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const loginGuard: CanActivateFn = (route, state) => {
  const authIn = inject(AuthService);
  const router = inject (Router);
  if( authIn.accessToken == null){
    router.navigate(['/']);
    return false;
  }
  return true;
};
