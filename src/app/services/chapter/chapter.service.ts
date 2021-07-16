import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Chapter } from 'src/app/models/Chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private httpClient: HttpClient) { }

  getListChapters(offset: number, limit: number, regex: string): Observable<any> {
    return this.httpClient.get(`chapter/?offset=${offset}&limit=${limit}&regex=${regex}`);
  }

  register(chapter: Chapter): Observable<any> {
    return this.httpClient.post('chapter/', chapter);
  }

  edit(id: number, body: Chapter): Observable<any> {
    return this.httpClient.put(`chapter/${id}/edit/`, body);
  }
}
