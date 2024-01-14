// header-utils.ts
import { HttpHeaders } from '@angular/common/http';

export function authHeader(): HttpHeaders {
  const userString = localStorage.getItem('user');
  const headers = new HttpHeaders();

  if (userString !== null) {
    const user = JSON.parse(userString);

    if (user && user.accessToken) {
      return headers.set('Authorization', 'Bearer ' + user.accessToken);
    }
  }

  return headers;
}
