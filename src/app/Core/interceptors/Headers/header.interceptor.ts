import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  //logic Request
  if (localStorage.getItem('Usertoken')) {
    if(req.url.includes('cart') || req.url.includes('Orders')|| req.url.includes('wishlist')){
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('Usertoken')!
      }
    })

  }
}


  return next(req); //logic Response
};
