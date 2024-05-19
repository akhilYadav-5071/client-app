import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
interface TreeNode {
  Module_Code: string;
  ModuleName: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menu: any;
  userType: any = '';
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userRole');
    this.dataService.getAllData().subscribe((data) => {
      this.menu = this.generateMenu(data, this.userType);
      console.log(this.menu);
      this.dataSource.data = this.menu;
    });
  }

  generateMenu(data: any, userType: any) {
    const userModules = data.userModuleAccess
      .filter((access: any) => access.UserMaster_Code === userType)
      .map((access: any) => access.Module_Code);

    const menu: any[] = [];

    data.moduleMaster.forEach((module: any) => {
      if (userModules.includes(module.Module_Code)) {
        menu.push(module);
      }
    });
    return this.createHierarchy(menu);
  }

  createHierarchy(menu: TreeNode[]): TreeNode[] {
    // Define the parent-child relationships
    const relationships: { [key: string]: string[] } = {
      M1: ['M3', 'M5'],
      M2: ['M7', 'M8'],
      M3: ['M4'],
      M5: ['M6'],
    };

    // Create a map for quick access
    const map: { [key: string]: TreeNode } = {};
    menu.forEach((item) => {
      map[item.Module_Code] = { ...item, children: [] };
    });

    // Build the hierarchy
    const hierarchy: TreeNode[] = [];

    menu.forEach((item) => {
      if (relationships[item.Module_Code]) {
        relationships[item.Module_Code].forEach((childCode) => {
          if (map[childCode]) {
            // Ensure the child exists
            map[item.Module_Code].children!.push(map[childCode]);
          }
        });
      }

      // If the item is not a child, add it to the hierarchy
      const isChild = Object.values(relationships)
        .flat()
        .includes(item.Module_Code);
      if (!isChild) {
        hierarchy.push(map[item.Module_Code]);
      }
    });

    return hierarchy;
  }

  selectedTab: any = 'Marketing';
  setSelectedTab(tab: any) {
    this.selectedTab = tab;
  }
}
