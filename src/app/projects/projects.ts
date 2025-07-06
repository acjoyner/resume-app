import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  standalone: true,
})
export class Projects {
  @Input() projects: any[] = [
    {
      title: 'Critical Infrastructure Data Hub (CIDH) | Duke Energy',
      description: [
        'Implement Python Confluent Kafka clients to produce and consume data from topics using various data sources.',
        'Produce reporting for vulnerability scans related to Tripwire IP360 and Tripwire Enterprise.',
        'Upgrade evidence request tool to leverage Confluent technologies.'
      ],
      technologies: ['Python', 'Tripwire', 'Kafka', 'Confluent', 'SQL'],
      date: 'Dec 2023 - Present',
      location: 'Charlotte, NC'
    },
    {
      title: 'Bounty Electronic Access Review (BEAR) | Duke Energy',
      description: [
        'Upgrade current re-certification process surrounding firewall policy and monitoring systems.',
        'Implement Angular front-end interface to provide functionality for Panorama (firewall rules and policies) and Cyber Asset Lifecycle Management.',
        'Produce dashboards and reporting tools related to bulk electric system cyber assets, electronic security, Electronic Access Point (EAP) Interfaces, Electronic Access Control or Monitoring Systems (EACMS) groupings, and Device Types.'
      ],
      technologies: ['Angular', 'Python', 'dotnet', 'SQL', 'C#'],
      date: 'Dec 2023 - Present',
      location: 'Charlotte, NC'
    },
    {
      title: 'Dream Estate Web Application',
      description: [
        'Developing a modern, responsive real estate website to showcase property listings and facilitate client interactions.',
        'Implementing user-friendly interfaces for property search, detailed views, and contact forms.',
        'Integrating with backend services to manage property data and user accounts.',
        'Utilizing Angular for the front-end, aiming for a dynamic user experience.',
        'Planning integration with Firebase for secure authentication and database management.',
        'Future plans include advanced search filters, map integration, and agent dashboards.'
      ],
      technologies: ['Angular', 'Tailwind CSS', 'Firebase (planned)', 'Node.js (planned)'],
      date: 'June 2025 - Present',
      location: 'Charlotte, NC',
      repo: 'https://github.com/acjoyner/dream-estate-app'
    }
  ];
}