import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  try {

    const rol: any = localStorage.getItem('1');
    console.log("este es el rol",rol);
    
    if (rol == 2) {
      return true;
    } else {
      router.navigate(['/authentication/side-login']);
      return false;
    }
  } catch (error) {
    router.navigate(['/authentication/side-login']);
    return false;
  }
};
