import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  totalPosts=10; //total no of posts
  postsPerPage=2; //current page
  currentPage=1;
  pageSizeOptions=[1,2,5,10]
  private postSub: Subscription;
  

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSub = this.postsService
        .getPostUpdateListener()
        .subscribe((posts:Post[])=>{
          this.isLoading=false;
          this.posts=posts;
        });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  OnDelete(postId:string){
      this.postsService.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
