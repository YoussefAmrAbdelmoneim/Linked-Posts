import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../core/services/posts/posts.service';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { IPost } from '../../shared/interfaces/ipost';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../shared/interfaces/iuser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InfiniteScrollDirective,
    CommonModule,
    CommentsComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly toastr = inject(ToastrService);
  posts: WritableSignal<IPost[]> = signal([]);
  currentPage: WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> = signal(false);
  hasMoreData: WritableSignal<boolean> = signal(true);
  savedImage!: File;
  content: string = '';
  userData: WritableSignal<IUser> = signal({} as IUser);
  isModalOpen: WritableSignal<boolean> = signal(false);
  ngOnInit(): void {
    this.getPosts();
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
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
          this.currentPage.update((page) => page + 1);
        }
        this.isLoading.set(false);
      },
    });
  }
  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.savedImage = input.files[0];
    }
  }
  createPost() {
    const formData = new FormData();
    formData.append('body', this.content);
    formData.append('image', this.savedImage);
    this.postsService.createPost(formData).subscribe({
      next: () => {
        this.getPosts();
        this.closeModal();
        this.toastr.success('Post published successfully.');
      },
    });
  }
  onScroll(): void {
    this.getPosts();
  }
}
