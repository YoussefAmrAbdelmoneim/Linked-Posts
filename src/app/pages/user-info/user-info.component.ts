import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IUser } from '../../shared/interfaces/iuser';
import { DatePipe } from '@angular/common';
import { IPost } from '../../shared/interfaces/ipost';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../core/services/comments/comments.service';

@Component({
  selector: 'app-user-info',
  imports: [DatePipe, CommentsComponent,FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
}) 
export class UserInfoComponent {
      private readonly postsService = inject(PostsService); 
      private readonly commentService = inject(CommentsService); 
        posts: WritableSignal<IPost[]> = signal([]);
        isLoading: WritableSignal<boolean> =signal(false);
         isModalOpen:WritableSignal< boolean >=signal( false);
        savedImage!:File;
        content!:string;
       userData: WritableSignal<IUser> = signal({}  as IUser) ; 
       openModal(): void {
        this.isModalOpen.set(true);
      }
    
      closeModal(): void {
        this.isModalOpen.set(false);
      }
  getUserData()
{
  this.postsService.getUserData().subscribe({
    next:(res) => {
      this.userData.set(res.user) 
      this.getUserPosts(this.userData()._id);     
    }
  })
}
getUserPosts(id:string): void {
  this.isLoading.set(true)
  this.postsService.getUserPosts(id).subscribe({
    next:(res) => {
      this.posts.set(res.posts);
      this.isLoading.set(false)
    }
  })
} 
changeImage(e:Event):void 
{ 
  const input=e.target as HTMLInputElement;
  if(input.files && input.files.length >0)
    {
        this.savedImage = input.files[0];
    }
    const formData =new FormData(); 
    formData.append('photo',this.savedImage);
    this.postsService.uploadProfilePicture(formData).subscribe();
} 
ChangeImage(e:Event):void 
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
      this.getUserData();
      this.closeModal();
    }
  })
}
deletePost(id:string)
{
  this.postsService.deletePost(id).subscribe({
    next:(res) => {
      this.getUserData();
    }
  })
}
ngOnInit(): void { 
  this.getUserData();
}
}  