import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Post} from './post.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[];
  private postsUpdated =  new Subject<Post[]>();
  
  constructor(private httpClient: HttpClient) { }

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

  addPost(title: string, content: string){
    const post:Post= {id:null, title: title, content: content};
    this.httpClient.post<{message:string, postId: string}>("http://localhost:3002/api/posts", post)
          .subscribe((responseData)=>{
            // console.log(responseData.message);
            const id = responseData.postId;
            post.id=id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
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
