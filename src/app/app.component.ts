import { Component } from '@angular/core';
import { OnlineOfflineService } from './services/online-offline.service';
import { DbContextService } from './services/db-context.service';
import { PostService } from './services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'postPWA';

  constructor( private dbStore: DbContextService,
               public toasts: ToastrService,
               private onlineOfflineService: OnlineOfflineService,
               private postService: PostService ) {

    this.onlineOfflineService.connectionChanged.subscribe( res => {
      if (res) {
        this.toasts.success('','No Network connection is available.', {
          timeOut: 1000,
        });
        const promisePostsList = [];
        console.log('Estamos ONLINE !');
        this.dbStore.getAll().then( res => {

          const posts = res;
          posts.forEach( post => {
            this.postService.postNewPost(post).subscribe((res: any) => {
              
              const promisePost = this.dbStore.delete(res.body.body.userId);
              promisePostsList.push(promisePost);

            });
          });
        });

      return Promise.all( promisePostsList );
      } else {
        this.toasts.warning('','No Network connection', {
          timeOut: 1000,
        });
      }
    });
  }
}
