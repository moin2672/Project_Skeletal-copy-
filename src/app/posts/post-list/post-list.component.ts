import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts=[];

  // posts = [
  //   // {title:'First Post', content:'First Post content'},
  //   // {title:'Second Post', content:'Second Post content'},
  //   // {title:'Third Post', content:'Third Post content'}
  // ];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts=this.postsService.getPosts();
  }

}
