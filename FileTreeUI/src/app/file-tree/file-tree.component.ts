import { Component, OnInit } from '@angular/core';

import {FileTreeHttpService} from './file-tree.http.service';
import {TreeFile} from '../Models/tree-file.model';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.sass']
})
export class FileTreeComponent implements OnInit {
    private root: TreeFile;

    public treeNodes = [];

    public nodes = [
      {
        id: 1,
        name: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        name: 'root2',
        children: [
          { id: 5, name: 'child2.1' },
          {
            id: 6,
            name: 'child2.2',
            children: [
              { id: 7, name: 'subsub' }
            ]
          }
        ]
      }
    ];

    constructor(private fileTreeHttpService: FileTreeHttpService) {}

    ngOnInit() {
        this.initializeTree();
    }

    private initializeTree() {
        this.fileTreeHttpService.getRoot()
            .subscribe(response => {
                this.root = response;
                let _id = 1;

                const rootNode = {
                    id: _id++,
                    name: this.root.name,
                    children: this.root.children.map(f => ({id: _id++, name: f.name))
                }; this.treeNodes = [rootNode];
            });
    }

    private buildChildrenNodes() {}
}
