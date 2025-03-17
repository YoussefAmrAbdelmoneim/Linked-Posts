import { Component, OnInit, signal, WritableSignal, inject } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../core/services/posts/posts.service';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { IPost } from '../../shared/interfaces/ipost';
import { FormsModule } from '@angular/forms';
@Component({ 
  selector: 'app-home',
  standalone: true,
  imports: [InfiniteScrollDirective, CommonModule, CommentsComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly postsService = inject(PostsService); 
  posts: WritableSignal<IPost[]> = signal([]);
  currentPage:  WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> =signal(false);
  hasMoreData:WritableSignal <boolean> =signal(true);    
  savedImage!:File;
  content:string="";
  isModalOpen:WritableSignal< boolean> = signal(false);
  ngOnInit(): void {
    this.getPosts();
  }  
  
  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
getUserData(): void
{
  this.postsService.getUserData().subscribe({
    next:(res) => {
      console.log(res.user);
    }  
  })
}
  getPosts(): void {
    if (this.isLoading() || !this.hasMoreData()) return;
    this.isLoading.set(true);

    this.postsService.getAllPosts(this.currentPage()).subscribe({
      next: (res) => {
        if (res.posts.length === 0) {
          this.hasMoreData.set(false);
        } else {
          this.posts.set([...this.posts(), ...res.posts]);
          this.currentPage.update((page)=>page+1);
        }
        this.isLoading.set(false);
      },
    }); 
  }
changeImage(e:Event):void 
{ 
  const input=e.target as HTMLInputElement;
  if(input.files && input.files.length >0)
    {
        this.savedImage = input.files[0];
    }
}
createPost()
{
 const formData =new FormData();
 formData.append('body',this.content);
 formData.append('image',this.savedImage);
  this.postsService.createPost(formData).subscribe({
    next:() => {
      this.getPosts();
      this.closeModal(); 
    }
  })
}
  onScroll(): void {
    this.getPosts();
  }
}