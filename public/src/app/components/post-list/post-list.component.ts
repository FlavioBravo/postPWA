import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { postInterface } from '../../models/post.interface';
import { SwPush } from '@angular/service-worker';

declare const window: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public postList: postInterface[] = [];
  readonly VAPID_PUBLIC_KEY = "BJF6yLLBeXqESpF-7EVQrYie1v5rwcuFOveNZFiSYVxi0Y4byZ2cVotTP7ejimvAgUHQlKxlnRI3F3BJe65BlsY";
  

  constructor( private postService: PostService,
               private swPush: SwPush) {

   }

  ngOnInit() {
    this.getPostList();
    this.subscribeToNotifications();
  }

  getPostList() {
    this.postService.getPostList()
      .subscribe( (res: postInterface[]) => {
        this.postList = res;
      });
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.postService.addPushSubscriber(sub).subscribe( res => console.log('Respuesta PUSH', res) );
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
