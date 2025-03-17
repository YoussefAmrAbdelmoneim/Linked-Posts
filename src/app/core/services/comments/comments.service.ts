import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient:HttpClient) { }
  getPostComments(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.url}/posts/${id}/comments`)
  }
  createComment(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.url}/comments`, data );
  } 
  deleteComment(id:String):Observable<any>
  {
    return this.httpClient.delete(`${environment.url}/comments/${id}`)
  }
}
