import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { IComment } from '../../interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../core/services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  postId: InputSignal<string> = input('');
  comments: WritableSignal<IComment[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  commentForm!: FormGroup;
  loggedInUserId!: string;
  private readonly commentsService = inject(CommentsService);
  private readonly postsService = inject(PostsService);
  private readonly toastr = inject(ToastrService);
  getComments() {
    this.isLoading.set(true);
    this.commentsService.getPostComments(this.postId()).subscribe({
      next: (res) => {
        this.comments.set(res.comments.reverse());
        this.isLoading.set(false);
      },
    });
  }
  onSubmit() {
    this.commentsService.createComment(this.commentForm.value).subscribe({
      next: (res) => {
        this.comments.set(res.comments.reverse());
        this.commentForm.get('content')?.reset();
        this.toastr.success('Your comment has been posted!');
      },
    });
  }
  getLoggedInUser(): void {
    this.postsService.getUserData().subscribe({
      next: (res) => {
        this.loggedInUserId = res.user._id;
      },
    });
  }
  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe({
      next: (res) => {
        this.toastr.info('Comment deleted successfully.');
        this.getComments();
      },
    });
  }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(null),
      post: new FormControl(this.postId()),
    });
    this.getComments();
    this.getLoggedInUser();
  }
}
