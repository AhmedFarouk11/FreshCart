import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../Services/Platform/platform.service';

export const authGuard: CanActivateFn = (route, state) => {
  let plaform = inject(PlatformService)
  let router = inject(Router)
 if(plaform.checkPlatForm())
  {
    if (localStorage.getItem('Usertoken') != null) {
      return true;  
    }
  }
     router.navigate(['/Register'])
      return false;
    
  
  
};
