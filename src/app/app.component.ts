import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client-app';
  menu: any;
  userType: string = 'ADMIN'; // Change this value to 'SALESPERSON' to test

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllData().subscribe(data => {
      this.menu = this.generateMenu(data, this.userType);
    });
  }

  generateMenu(data:any, userType:any) {
    const userModules = data.userModuleAccess
      .filter((access:any) => access.UserMaster_Code === userType)
      .map((access:any) => access.Module_Code);

    const moduleLookup:any = {};
    data.moduleMaster.forEach((module:any) => {
      moduleLookup[module.Module_Code]  = module.ModuleName;
    });

    const menu: any[] = [];

    userModules.forEach((moduleCode:any) => {
      const moduleName = moduleLookup[moduleCode];
      menu.push(moduleName);
    });

    return menu;
  }
}
