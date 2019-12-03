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
  readonly VAPID_PUBLIC_KEY = "BFa_InG6g_h7FmupBqEunZ_PHMqsIagrp_YtKcvqayxtrPQdVZ0a_2IEqxIcY_HKv-3Ptu041ifF-4jONsSoHB4";
  

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
      this.postService.addPushSubscriber( sub ).subscribe( res => console.log('Respuesta PUSH', res) );
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
