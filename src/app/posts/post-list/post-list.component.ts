import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts=[];
  private postSub: Subscription;
  // posts = [
  //   // {title:'First Post', content:'First Post content'},
  //   // {title:'Second Post', content:'Second Post content'},
  //   // {title:'Third Post', content:'Third Post content'}
  // ];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts=this.postsService.getPosts();
    this.postSub = this.postsService
        .getPostUpdateListener()
        .subscribe((posts:Post[])=>{this.posts=posts;});
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
