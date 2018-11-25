import {FileType} from './file-type.enum';

export class TreeFile {
    name: string;
    path: string;
    type: FileType;
    children: TreeFile[];
}
