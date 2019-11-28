import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { postInterface } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private http: HttpClient ) {

  }

  getPostList(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      map( (res:any) =>{
          return res;
      })
    );
  }

  getPostById( postId: string){
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${ postId }`).pipe(
      map( (res:any) =>{
          return res;
      })
    );
  }

  postNewPost( newPost: postInterface ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post('https://jsonplaceholder.typicode.com/posts', { body: newPost }, { headers, observe: 'response' }).pipe(
      map( (res:any) =>{
          return res;
      })
    );
  }

  deletePostById( postId: string ) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${ postId }`).pipe(
      map( (res:any) =>{
          return res;
      })
    );
  }
}
