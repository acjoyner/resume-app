import { Routes } from '@angular/router';
import { Summary } from './summary/summary';
import { Education } from './education/education';
import { Experience } from './experience/experience';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';
import { AskMeAnything } from './ask-me-anything/ask-me-anything';
import { BlogList } from './blog-list/blog-list';
import { BlogPost } from './blog-post/blog-post';

export const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' }, // Default route
  { path: 'summary', component: Summary },
  { path: 'projects', component: Projects },
  { path: 'experience', component: Experience },
  { path: 'skills', component: Skills },
  { path: 'education', component: Education },
  { path: 'ask-me-anything', component: AskMeAnything },
  { path: 'blog', component: BlogList },
  { path: 'blog/:slug', component: BlogPost }, // This is a dynamic route
  { path: '**', redirectTo: '/summary' }, // Wildcard route for any unmatched paths
];
