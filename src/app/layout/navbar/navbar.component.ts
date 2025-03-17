import { IUser } from './../../shared/interfaces/iuser';
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, InputSignal, PLATFORM_ID, Renderer2, signal, Signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDarkMode: boolean = false;
  isLogin:InputSignal<boolean>=input<boolean>(true)
  constructor(private renderer: Renderer2) {}
  private platformId=inject(PLATFORM_ID); 
  public authService=inject(AuthService);
    private readonly postsService = inject(PostsService); 
     userData: WritableSignal<IUser> = signal({}  as IUser) ;
    ngOnInit() {      
      this.getUserData()
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      if (this.isDarkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      }
    }
  }
  logout() {
    this.authService.logout();
  }
  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
  getUserData()
{
  this.postsService.getUserData().subscribe({
    next:(res) => {
      this.userData.set(res.user)
    }
  })
}
}
