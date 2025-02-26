import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {path:'details/:Pid',renderMode:RenderMode.Server},
  {path:'Adress/:PcartId',renderMode:RenderMode.Server},

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
