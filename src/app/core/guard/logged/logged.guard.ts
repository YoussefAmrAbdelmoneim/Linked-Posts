import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  const platform_ID=inject(PLATFORM_ID)
  if(isPlatformBrowser(platform_ID))
  {
  if(localStorage.getItem("token") !==null)
  {
    router.navigate(['/home'])
      return false;
  }
  else {
    return true;
  }
}
else{
  return false;
}
};
