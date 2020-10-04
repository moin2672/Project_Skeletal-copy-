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
  isLoading=false;
  posts=[];
  private postSub: Subscription;
  // posts = [
  //   // {title:'First Post', content:'First Post content'},
  //   // {title:'Second Post', content:'Second Post content'},
  //   // {title:'Third Post', content:'Third Post content'}
  // ];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts();
    this.postSub = this.postsService
        .getPostUpdateListener()
        .subscribe((posts:Post[])=>{
          this.isLoading=false;
          this.posts=posts;
        });
  }

  OnDelete(postId:string){
      this.postsService.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
