import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post:Post;
  enteredTitle="";
  enteredContent="";
  private editMode = false;
  private postId:string;
  

  constructor(private postsService: PostsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.editMode=true;
        this.postId=paramMap.get('postId');
        this.post=this.postsService.getPost(this.postId);
      } else {
        this.editMode=false;
        this.postId=null;
      }
    });
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
