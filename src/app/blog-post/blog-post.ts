import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BLOG_POSTS, BlogPost as BlogPostData } from '../blog-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  standalone: true,
})
export class BlogPost {
  post: BlogPostData | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the 'slug' from the URL
    const slug = this.route.snapshot.paramMap.get('slug');
    // Find the matching blog post from our data file
    this.post = BLOG_POSTS.find(p => p.slug === slug);
  }
}
