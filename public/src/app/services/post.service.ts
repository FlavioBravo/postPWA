import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { postInterface } from '../models/post.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: postInterface[] = [];

  constructor( private http: HttpClient ) {

  }

  getPostList(){
    if ( this.posts.length > 0 ) {
      return of(this.posts);
    }

    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      map( (res: postInterface[]) =>{
          this.posts = res;
          return res;

      })
    );
  }

  getPostById( postId: number){

    if ( this.posts.length > 0 ) {
      // hay paises en el arreglo
      const pais = this.posts.find( p => p.id === postId );
      return of( pais );
    }

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

  addPushSubscriber( subscription: any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post('http://localhost:3000/api/subscribe', { body: subscription }, { headers, observe: 'response' }).pipe(
      map( (res:any) =>{
          return res;
      })
    );
  }
}
