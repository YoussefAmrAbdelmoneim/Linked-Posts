import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platform_ID=inject(PLATFORM_ID)
  if(isPlatformBrowser(platform_ID))
  {
  if(localStorage.getItem('token')!==null)
  {
      req=req.clone({
    setHeaders:{token:localStorage.getItem('token')!}
  })
  }
}
  return next(req);
};
