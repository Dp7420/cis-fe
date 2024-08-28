import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class Jwtinterceptor implements HttpInterceptor {

    // constructor(private authService: AdminService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let token = localStorage.getItem('token');
      if (token) {
        token = token.replace(/^"|"$/g,'');
        // console.log(token);
      }
   
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
  
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  
}
