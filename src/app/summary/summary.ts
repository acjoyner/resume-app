import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true, // Summary component is standalone
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss']
})
export class Summary {
  @Input() summary: string = 'Dynamic IT professional with a passion for leveraging cutting-edge technologies to drive innovation and enhance operational efficiency. Seeking a challenging opportunity where I can apply my diverse technical skill set, including proficiency in Java, Python, and JavaScript, along with expertise in frameworks like Angular and Django, to contribute to the development and implementation of robust IT solutions. Committed to continuous learning and growth in a collaborative environment that fosters creativity and excellence.';
}