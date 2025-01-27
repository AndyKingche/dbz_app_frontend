
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  try {

    const rol: any = localStorage.getItem('1');
    console.log("este es el rol",rol);
    
    if (rol == 1) {
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
