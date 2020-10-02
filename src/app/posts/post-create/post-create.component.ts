import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle="";
  enteredContent="";

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(postForm: NgForm){
    if(postForm.invalid){
      return;
    }
    const post: Post={id:null, title:postForm.value.title, content:postForm.value.content}
    this.postsService.addPost(postForm.value.title, postForm.value.content);
    console.log(post);
    postForm.resetForm();
  }

}
