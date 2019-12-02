import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { postInterface } from '../../models/post.interface';

declare const window: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public postList: postInterface[] = [];

  constructor( private postService: PostService) {

   }

  ngOnInit() {
    this.getPostList();
  }

  getPostList() {
    this.postService.getPostList()
      .subscribe( (res: postInterface[]) => {
        console.log(res);
        this.postList = res;
      });
  }

}
