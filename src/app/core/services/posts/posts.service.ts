import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../shared/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient:HttpClient) { }
  getAllPosts(page: number): Observable<any> {
    return this.httpClient.get(`${environment.url}/posts?page=${page}`);
  }
  getUserData():Observable<any>
  {
    return this.httpClient.get(`${environment.url}/users/profile-data`);
  }
  createPost(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.url}/posts`,data);
  }
  deletePost(id:string):Observable<any>
  {
    return this.httpClient.delete(`${environment.url}/posts/${id}`);
  }
  uploadProfilePicture(data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.url}/users/upload-photo`,data);
  }
  getUserPosts(id:String):Observable<any>
  {
    return this.httpClient.get(`${environment.url}/users/${id}/posts`);
  }
}
