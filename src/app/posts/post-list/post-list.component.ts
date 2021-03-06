import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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

  totalPosts=0; //total no of posts
  postsPerPage=2; //current page
  currentPage=1;
  pageSizeOptions=[1,2,5,10]
  userId:string;

  userIsAuthenticated=false;
  private postSub: Subscription;
  private authStatusSub:Subscription;

  constructor(private postsService: PostsService, private authService:AuthService ) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId=this.authService.getUserId();
    this.postSub = this.postsService
        .getPostUpdateListener()
        .subscribe((postData:{posts:Post[], postCount:number})=>{
          this.isLoading=false;
          this.posts=postData.posts;
          this.totalPosts=postData.postCount;
        });
        this.userIsAuthenticated=this.authService.getIsAuth();
        this.authStatusSub=this.authService.getAuthStatusListener()
                              .subscribe(isAuthenticated=>{
                                this.userIsAuthenticated=isAuthenticated;
                                this.userId=this.authService.getUserId();
                              });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  OnDelete(postId:string){
    this.isLoading=true;
    this.postsService.deletePost(postId)
                    .subscribe(()=>{
                      this.postsService.getPosts(this.postsPerPage, this.currentPage)
                    },()=>{
                      this.isLoading=false;
                    });
  }
  ngOnDestroy(){  
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
