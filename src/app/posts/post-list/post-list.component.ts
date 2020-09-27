import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts = [
    // {title:'First Post', content:'First Post content'},
    // {title:'Second Post', content:'Second Post content'},
    // {title:'Third Post', content:'Third Post content'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
