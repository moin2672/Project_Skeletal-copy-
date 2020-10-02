import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[]=[];
  private postsUpdated =  new Subject<Post[]>();
  
  constructor(private httpClient: HttpClient) { }

  getPosts(){
    this.httpClient.get<{message:string, posts:Post[]}>("http://localhost:3001/api/posts")
          .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postsUpdated.next([...this.posts]);
          })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post:Post= {id:null, title: title, content: content};
    this.httpClient.post<{message:string}>("http://localhost:3001/api/posts", post)
          .subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
          })
    
  }

}
