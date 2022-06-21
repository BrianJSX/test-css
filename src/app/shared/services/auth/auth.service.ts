import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthorizationHeaders() {
    const token: string | null = localStorage.getItem("token")|| '';
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

}
