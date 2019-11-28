import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:id', component: PostComponent},
  { path: '**', component: PostListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
