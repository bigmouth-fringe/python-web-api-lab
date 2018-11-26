import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {TreeFile} from '../Models/tree-file.model';

@Injectable()
export class FileTreeHttpService {
    private readonly serverUrl = 'http://127.0.0.1:5000/';
    private readonly httpOptions = { responseType: 'blob' as 'json' };

    constructor(private http: HttpClient) {}

    public getRoot(): Observable<TreeFile> {
        return this.http.get<TreeFile>(this.serverUrl + 'root');
    }

    public getChildren(path: string): Observable<TreeFile[]> {
        return this.http.get<TreeFile[]>(this.serverUrl + 'directories/' + path);
    }

    public downloadFile(path: string): Observable<Blob> {
        return this.http.get<Blob>(this.serverUrl + 'download/' + path, this.httpOptions);
    }

    public postFolder(newPath: string): Observable<any> {
        return this.http.post(this.serverUrl + 'directory/' + newPath, null);
    }

    public deleteFolder(path: string): Observable<any> {
        return this.http.delete(this.serverUrl + 'directory/' + path);
    }
}
