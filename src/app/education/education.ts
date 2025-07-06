import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  standalone: true
})
export class Education {
   @Input() education: any[] = [
    {
      degree: 'Master of Science in Information Technology',
      university: 'North Carolina Agricultural & Technical State University',
      location: 'Greensboro, NC',
      date: 'Graduated May 2017'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      university: 'North Carolina Agricultural & Technical State University',
      location: 'Greensboro, NC',
      date: 'Graduated May 2012'
    }
   ];
}