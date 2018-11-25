import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {TreeFile} from '../Models/tree-file.model';

@Injectable()
export class FileTreeHttpService {
    private readonly serverUrl = 'http://127.0.0.1:5000/';

    constructor(private http: HttpClient) {}

    public getRoot(): Observable<TreeFile> {
        return this.http.get<TreeFile>(this.serverUrl + 'root');
    }
}
