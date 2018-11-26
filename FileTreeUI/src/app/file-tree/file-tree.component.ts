import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {TreeNode} from 'angular-tree-component/dist/defs/api';
import {TreeComponent, TreeModel} from 'angular-tree-component';

import {FileTreeHttpService} from './file-tree.http.service';
import {TreeFile} from '../Models/tree-file.model';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.sass']
})
export class FileTreeComponent implements OnInit, AfterViewInit {
    @ViewChild('tree') treeComponent: TreeComponent;

    public treeNodes: TreeNode[];
    public selectedNode: TreeNode;

    private root: TreeFile;
    private tree: TreeModel;

    constructor(private fileTreeHttpService: FileTreeHttpService) {}

    ngOnInit() {
        this.initializeTree();
    }

    ngAfterViewInit() {
        this.tree = this.treeComponent.treeModel;
    }

    /** Tree Events */
    public onExpand($event) {
        const file = $event.node.data;

        if (file.name === 'root' || $event.isExpanded === false) {
            return;
        }

        this.fileTreeHttpService.getChildren(file.path)
            .subscribe(response => {
                file.children = response.map(c => ({
                      name: c.name,
                      path: c.path,
                      type: c.type,
                      hasChildren: c.type === 'directory'
                }));

                this.tree.update();
            });
    }

    public onSelect($event) {
        this.selectedNode = $event.node;
    }

    public onUnselect() {
        this.selectedNode = null;
    }

    public onDownloadClick() {
        let file = this.selectedNode.data;
        if (file.type !== 'file') {
            return;
        }

        this.fileTreeHttpService.downloadFile(file.path)
            .subscribe(data => {
                const newBlob = new Blob([data]);
                const downloadURL = window.URL.createObjectURL(data);
                const link = document.createElement('a');

                link.href = downloadURL;
                link.download = "File";
                link.click();
            });
    }

    public onCreateClick() {
        const file = this.selectedNode.data;
        const newFolderName = prompt('Please enter new folder name', 'NewFolder');
        const newPath = file.path + '/' + newFolderName;

        this.fileTreeHttpService.postFolder(newPath)
            .subscribe(response => {
                const createdFile = response.data;

                const newNode = {
                    name: createdFile.name,
                    path: createdFile.path,
                    type: createdFile.type,
                    hasChildren: createdFile.type === 'directory'
                };

                file.children.push(newNode);
                this.tree.update();
            });
    }

    public onDeleteClick() {
        const file = this.selectedNode.data;

        this.fileTreeHttpService.deleteFolder(file.path)
            .subscribe(response => {
                if (!response.success) {
                    return;
                }

                this.selectedNode.hide();
            });
    }

    private initializeTree() {
        this.fileTreeHttpService.getRoot()
            .subscribe(response => {
                this.root = response;
                this.treeNodes = this.buildRootNode();
            });
    }

    private buildRootNode(): TreeNode[] {
        const rootNode = {
          name: 'root',
          path: this.root.path,
          type: this.root.type,
          children: this.root.children.map(f => ({
              name: f.name,
              path: f.path,
              type: f.type,
              hasChildren: f.type === 'directory'
          }))
        };

        return [rootNode];
    }

    private buildChildrenNodes() {}
}
