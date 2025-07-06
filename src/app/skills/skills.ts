import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Skills {
  // Input property for technical skills
  @Input() technicalSkills: { [key: string]: string } = {
    'Programming Languages': 'JavaScript, TypeScript, Python',
    'Web Development': 'Angular, React, Node.js',
    Database: 'MongoDB, MySQL',
    DevOps: 'Docker, Kubernetes, Jenkins',
    'Cloud Platforms': 'AWS, Azure, Google Cloud',
    'Testing Frameworks': 'Jest, Mocha, Cypress',
    'Version Control': 'Git, GitHub, GitLab',
    'Agile Methodologies': 'Scrum, Kanban, Agile',
    'Soft Skills': 'Communication, Teamwork, Problem Solving',
    'Other Skills': 'RESTful APIs, GraphQL, WebSockets',
  };

  // No longer need ag-grid specific data or column definitions
  // We will convert the object to an array for the template
  skillsArray: { category: string; skills: string }[] = [];

  ngOnInit(): void {
    this.skillsArray = Object.entries(this.technicalSkills).map(
      ([category, skills]) => ({
        category,
        skills,
      })
    );
  }
}