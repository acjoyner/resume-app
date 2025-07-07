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
        'Produce dashboards and reporting tools related to bulk electric system cyber assets and electronic security.'
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
        'Planning integration with Firebase for secure authentication and database management.'
      ],
      technologies: ['Angular', 'Tailwind CSS', 'Firebase (planned)', 'Node.js (planned)'],
      date: 'June 2025 - Present',
      location: 'Charlotte, NC',
      repo: 'https://github.com/acjoyner/dream-estate-app'
    },
     {
      title: 'End-to-end Multi-class Dog Breed Classification',
      description: [
        'Built a deep learning model to identify 120 different dog breeds from images.',
        'Utilized transfer learning with a pre-trained model to handle unstructured image data.',
        'Processed and augmented a dataset of over 10,000 training images from Kaggle.',
        'The goal is to predict the breed of a dog from a photograph with high accuracy.'
      ],
      technologies: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Google Colab'],
      date: 'June 2025 - Present',
      location: 'Charlotte, NC',
      repo: 'https://github.com/acjoyner/DogVision' // ✅ Updated Link
    },
  ];
}