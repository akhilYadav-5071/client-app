
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUserMaster(): Observable<any> {
    return this.http.get('assets/UserMaster_response.json');
  }

  getModuleMaster(): Observable<any> {
    return this.http.get('assets/ModuleMaster_response.json');
  }

  getUserModuleAccess(): Observable<any> {
    return this.http.get('assets/UserModuleAccess_response.json');
  }

  getAllData(): Observable<any> {
    return forkJoin({
      userMaster: this.getUserMaster(),
      moduleMaster: this.getModuleMaster(),
      userModuleAccess: this.getUserModuleAccess()
    });
  }
}
