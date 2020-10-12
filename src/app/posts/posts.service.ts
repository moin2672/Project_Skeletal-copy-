import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[];
  private postsUpdated =  new Subject<{posts:Post[], postCount:number}>();
  
  constructor(private httpClient: HttpClient, private router:Router) { }

  getPosts(postsPerPage:number, currentPage: number){
    const queryParams=`?pagesize=${postsPerPage}&currentpage=${currentPage}`;
    console.log(queryParams)
    this.httpClient.get<{message:string, posts:any[], maxPosts:number}>("http://localhost:3002/api/posts"+queryParams)
          .pipe(map((postData)=>{
            return { 
              posts: postData.posts.map(post => {
                return {
                  title:post.title,
                  content:post.content,
                  id:post._id,
                  imagePath:post.imagePath,
                  creator: post.creator
                };
              }),
              maxPosts:postData.maxPosts
            };
          }))
          .subscribe(transformedPostData=>{
            // console.log(transformedPostData)
            this.posts=transformedPostData.posts;
            console.log({
              posts:[...this.posts],
              postCount: transformedPostData.maxPosts
            })
            this.postsUpdated.next({
                                    posts:[...this.posts],
                                    postCount: transformedPostData.maxPosts
                                  });
          })
  }

  getPost(id:string){
    // console.log(id)
    // console.log(this.posts.find(p=>p.id===id))
    return this.httpClient.get<{
      _id:string;
      title: string;
      content: string;
      imagePath:string;
      creator:string;
    }>("http://localhost:3002/api/posts/"+id);
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image:File){
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content", content)
    postData.append("image", image, title)

    this.httpClient.post<{message:string, post: Post}>("http://localhost:3002/api/posts", postData)
          .subscribe((responseData)=>{
            this.router.navigate(['/']);
          })
    
  }

  updatePost(id:string, title:string, content:string, image:File|string){
    let postData:Post|FormData;
    if(typeof(image) === 'object'){
      postData=new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("content", content)
      postData.append("image", image, title)
    }else{
      postData={
        id:id,
        title:title,
        content:content,
        imagePath:image,
        creator:null
      }

    }
    // const post:Post={id:id, title:title, content:content, imagePath: null}
    this.httpClient.put("http://localhost:3002/api/posts/"+id, postData)
    .subscribe(response=>{
        this.router.navigate(['/']);
    })
  }

  deletePost(postId:string){
    return this.httpClient.delete("http://localhost:3002/api/posts/"+postId);
  }

}
