import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass, etc.

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone component
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], // Import necessary modules
  templateUrl: './app.html', // Updated template file name
  styleUrl: './app.scss' // Updated style file name (assuming .css)
})
export class App { // Class name updated to App
  router = inject(Router); // Using inject for Router
  protected title = 'Anthony C. Joyner - Resume';

  // Resume Data - Centralized data for the main app and passed to child components
  resumeData = {
    name: "Anthony Clayton Joyner",
    title: "Dynamic IT Professional",
    summary: "A highly accomplished and results-driven IT professional with a robust background spanning diverse technical domains, including software development, system administration, database management, and cloud technologies. Passionate about leveraging cutting-edge technologies—particularly Java, Python, and JavaScript, complemented by expertise in Angular and Django frameworks—to engineer innovative and scalable IT solutions that enhance operational efficiency and drive business growth. My commitment extends to continuous learning and professional development, thriving in collaborative environments that foster creativity, excellence, and the successful delivery of complex projects. I am adept at translating intricate technical requirements into practical, high-impact solutions, consistently contributing to organizational success through strategic problem-solving and a proactive approach to technology challenges.",
    technicalSkills: {
      "Programming Languages": "Proficient in Java, Python, and JavaScript, with experience in developing scalable applications and solutions.",
      "Frameworks": "Skilled in Utilizing React, Angular, Flask and Django frameworks to streamline development processes and create dynamic web applications.",
      "Operating Systems": "Experienced in Linux, Windows, and MacOS environments, adept at system administration tasks and troubleshooting.",
      "Database Management": "Familiar with SQL and NoSQL databases such as MySQL and SQLite, proficient in database design and optimization.",
      "Cloud Technologies": "Knowledgeable in cloud computing platforms like AWS (Amazon Web Services).",
      "Web Development": "Skilled in HTML, CSS, and JavaScript for front-end development with experience in building responsive and interactive user interfaces."
    },
    workExperience: [
      {
        company: "Duke Energy",
        location: "Charlotte, North Carolina",
        title: "IT Application Analyst – Compliance Tools Program",
        date: "June 2020 – Present",
        responsibilities: [
          "Support the management of the Cyber Asset Life Cycle Management Tool (Archer) as part of the North American Energy Reliable Corporation (NERC) Critical Infrastructure Protection (CIP) Tools Program, ensuring seamless operation and compliance.",
          "Facilitate the provisioning of access and meticulously maintain updated testing environments to ensure smooth application upgrades and enhancements.",
          "Provide continuous support for enhancement, product and issue management, and technology upgrades within the program that improve reliability and accuracy of data."
        ]
      },
      {
        company: "North Carolina Agricultural & Technical State University",
        location: "Greensboro, North Carolina",
        title: "IT Instructor – Computer System Technology Department",
        date: "January 2018 – 2024",
        responsibilities: [
          "Instruct technical courses encompassing Python, Linux System Administration, Java, and Web Systems, cultivating a stimulation learning environment to empower students with practical skills and knowledge.",
          "Develop comprehensive course materials and meticulously facilitate the curriculum, crafting relevant assignments to promote real-world application and ensure optimal learning outcomes.",
          "Lead engaging and informative meetings, delivering exemplary service to foster collaboration and support within the department, school and university."
        ]
      },
      {
        company: "Duke Energy",
        location: "Charlotte, North Carolina",
        title: "IT Associate III",
        date: "November 2019 – June 2020",
        responsibilities: [
          "Provided expert support for customers utilizing big data, leveraging workload automation to create scheduled jobs, enhancing efficiency, and reducing manual workload by 79%.",
          "Played a key role in upgrades and patches, conducting thorough testing on workflows, and meticulously documenting processes and procedures to ensure compliance and operational excellence.",
          "Maintained and improved Informatica, Data Virtualization and Rochade Data Lineage platforms, ensuring optimal performance and functionality."
        ]
      },
      {
        company: "Duke Energy",
        location: "Charlotte, North Carolina",
        title: "IT Associate III – Advanced Distribution Management Systems (ADMS)",
        date: "June 2018 – November 2019",
        responsibilities: [
          "Collaborated closely with vendors to gain insights into products leveraged by Duke Energy, facilitating informed decision- making and optimizing supervisory control and data acquisition (SCADA) technology solutions.",
          "Assisted with the automation of critical daily processes, significantly saving time, and mitigating the risk of human error, resulting in improved operational efficiency.",
          "Contributed to the creation of production pipelines in collaboration with DevOps teams, enhancing agility and salability in software delivery."
        ]
      },
      {
        company: "Duke Energy",
        location: "Charlotte, North Carolina",
        title: "IT Associate II – Information Management Solutions",
        date: "June 2017 – July 2018",
        responsibilities: [
          "Executed individual work assignments encompassing development and support for various business applications, demonstrating proficiency in application and system design.",
          "Effectively addressed complex intra-system issues, ensuring seamless integration and functionality.",
          "Collaborated cross functionally with vendors, project managers, and customers to fulfill requirements and deliver successful project outcomes, fostering productive partnerships."
        ]
      },
      {
        company: "Bank of America",
        location: "Charlotte, North Carolina",
        title: "VP, Senior Auditor I",
        date: "June 2013 – May 2017",
        responsibilities: [
          "Collaborated with the Strategy Development and Investigation Team, playing a pivotal role in updating server configurations and securing access to closed audit databases to facilitate comprehensive audits and investigations.",
          "Conducted thorough interviews and audits to validate controls within the enterprise relationship management, ensuring adherence to regulatory standards and operational excellence.",
          "Played a key role in mitigating critical audit issues, leveraging findings to form actionable conclusions and drive continuous improvement initiatives.",
          "Tested controls surrounding applications and data centers, performing internal Quality Assurance (QA) to uphold the integrity and security of systems.",
          "Supported Business Entity Risk Assessments (BERAs), contributing to the enhancement of QA scores by 81% and bolstering organizational risk management practices."
        ]
      }
    ],
    education: [
      {
        university: "North Carolina Agricultural & Technical State University",
        location: "Greensboro, North Carolina",
        degree: "M.S., Information Technology",
        date: "May 2017"
      },
      {
        university: "North Carolina Agricultural & Technical State University",
        location: "Greensboro, North Carolina",
        degree: "B.S., Computer Technology",
        date: "May 2012"
      }
    ]
  };

   getTabButtonClass(path: string): string {
    // Check if the current route starts with the given path to highlight active tab
    return `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
      this.router.url.startsWith(path)
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-gray-200 text-gray-700 hover:bg-blue-200 hover:text-blue-800'
    }`;
  }
}
