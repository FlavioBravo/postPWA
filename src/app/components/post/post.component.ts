import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { postInterface } from '../../models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public currentPost: postInterface;

  constructor( private postService: PostService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostById( id );
  }

  getPostById( postId: string ) {
    this.postService.getPostById( postId ).
      subscribe( (res: postInterface ) => {
        this.currentPost = res;
      });
  }

  deletePostById( postId: number ) {
    this.postService.deletePostById( postId.toString() ).
    subscribe( (res: any ) => {
      console.log( res );
      alert('Post deleted!');
    });
  }

}
