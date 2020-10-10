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
  private postsUpdated =  new Subject<Post[]>();
  
  constructor(private httpClient: HttpClient, private router:Router) { }

  getPosts(){
    this.httpClient.get<{message:string, posts:any[]}>("http://localhost:3002/api/posts")
          .pipe(map((postData)=>{
            return postData.posts.map(post => {
              return {
                title:post.title,
                content:post.content,
                id:post._id
              };
            })
          }))
          .subscribe(transformedPosts=>{
            this.posts=transformedPosts;
            this.postsUpdated.next([...this.posts]);
          })
  }

  getPost(id:string){
    // console.log(id)
    // console.log(this.posts.find(p=>p.id===id))
    return this.httpClient.get<{_id:string, title: string, content: string}>("http://localhost:3002/api/posts/"+id);
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image:File){
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content", content)
    postData.append("image", image, title)

    this.httpClient.post<{message:string, postId: string}>("http://localhost:3002/api/posts", postData)
          .subscribe((responseData)=>{
            // console.log(responseData.message);
            const post : Post ={id:responseData.postId, title:title, content:content}
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
          })
    
  }

  updatePost(id:string, title:string, content:string){
    const post:Post={id:id, title:title, content:content}
    this.httpClient.put("http://localhost:3002/api/posts/"+id, post)
    .subscribe(response=>{
      // console.log(response)
      const updatedPosts = [...this.posts];
      const oldPostIndex =  updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    })
  }

  deletePost(postId:string){
    this.httpClient.delete("http://localhost:3002/api/posts/"+postId)
        .subscribe(()=>{
          const updatedPosts = this.posts.filter(post=> post.id!=postId);
          this.posts=updatedPosts;
          this.postsUpdated.next([...this.posts]);
          console.log("Deleted!");
        });
  }

}
