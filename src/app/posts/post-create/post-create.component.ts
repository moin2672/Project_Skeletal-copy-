import { Component,  OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
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
  form:FormGroup;
  imagePreview:string;
  private postId:string;
  

  constructor(private postsService: PostsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.form=new FormGroup({
      title:new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      content:new FormControl(null, {validators:[Validators.required]}),
      image:new FormControl(null, {validators:[Validators.required]})
    })

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.editMode=true;
        this.postId=paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId)
            .subscribe(postData=>{
              this.isLoading=false;
              console.log(postData);
              const transformedPostData: Post={
                                          id:postData._id, 
                                          title:postData.title, 
                                          content:postData.content
                                        }
              this.post=transformedPostData;
              this.form.setValue({
                                  title:this.post.title, 
                                  content:this.post.content
                                })
              console.log(this.post)
            });
      } else {
        this.editMode=false;
        this.postId=null;
      }
    });
  }

  onImagePicked(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image:file
    });
    this.form.get('image').updateValueAndValidity();
    const reader= new FileReader();
    reader.onload = ()=>{
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading=true;
    if(!this.editMode){
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }

}
