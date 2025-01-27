
import { CanActivateFn} from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  return true;
};
