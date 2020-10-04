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
  editMode = false;
  isLoading=false;
  private postId:string;
  

  constructor(private postsService: PostsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.editMode=true;
        this.postId=paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId)
            .subscribe(postData=>{
              this.isLoading=false;
              console.log(postData);
              const transformedPostData: Post={id:postData._id, title:postData.title, content:postData.content}
              this.post=transformedPostData;
              console.log(this.post)
            });
      } else {
        this.editMode=false;
        this.postId=null;
      }
    });
  }

  onSavePost(postForm: NgForm){
    if(postForm.invalid){
      return;
    }
    this.isLoading=true;
    if(!this.editMode){
      this.postsService.addPost(postForm.value.title, postForm.value.content);
    } else {
      this.postsService.updatePost(this.postId, postForm.value.title, postForm.value.content);
    }
    postForm.resetForm();
  }

}
