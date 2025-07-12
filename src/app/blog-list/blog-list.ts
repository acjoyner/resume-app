import { Component } from '@angular/core';
import { BLOG_POSTS, BlogPost } from '../blog-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
  standalone: true,
})
export class BlogList {
  posts: BlogPost[] = BLOG_POSTS;
}
