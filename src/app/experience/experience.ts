import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorkExperience {
  company: string;
  title: string;
  date: string;
  responsibilities: string[];
}

interface GroupedExperience {
  company: string;
  roles: {
    title: string;
    date: string;
    responsibilities: string[];
  }[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Experience {
  @Input() workExperience: WorkExperience[] = [
  {
    company: 'Duke Energy',
    title: 'IT Application Analyst – Compliance Tools Program',
    date: 'June 2020 – Present',
    responsibilities: [
      'Support the management of the Cyber Asset Life Cycle Management Tool (Archer) as part of the North American Energy Reliable Corporation (NERC) Critical Infrastructure Protection (CIP) Tools Program, ensuring seamless operation and compliance.',
      'Facilitate the provisioning of access and meticulously maintain updated testing environments to ensure smooth application upgrades and enhancements.',
      'Provide continuous support for enhancement, product and issue management, and technology upgrades within the program that improve reliability and accuracy of data.'
    ]
  },
  {
    company: 'North Carolina Agricultural & Technical State University',
    title: 'IT Instructor – Computer System Technology Department',
    date: 'January 2018 – 2024',
    responsibilities: [
      'Instruct technical courses encompassing Python, Linux System Administration, Java, and Web Systems, cultivating a stimulating learning environment to empower students with practical skills and knowledge.',
      'Develop comprehensive course materials and meticulously facilitate the curriculum, crafting relevant assignments to promote real-world application and ensure optimal learning outcomes.',
      'Lead engaging and informative meetings, delivering exemplary service to foster collaboration and support within the department, school, and university.'
    ]
  },
  {
    company: 'Duke Energy',
    title: 'IT Associate III',
    date: 'November 2019 – June 2020',
    responsibilities: [
      'Provided expert support for customers utilizing big data, leveraging workload automation to create scheduled jobs, enhancing efficiency, and reducing manual workload by 79%.',
      'Played a key role in upgrades and patches, conducting thorough testing on workflows, and meticulously documenting processes and procedures to ensure compliance and operational excellence.',
      'Maintained and improved Informatica, Data Virtualization and Rochade Data Lineage platforms, ensuring optimal performance and functionality.'
    ]
  },
  {
    company: 'Duke Energy',
    title: 'IT Associate III – Advanced Distribution Management Systems (ADMS)',
    date: 'June 2018 – November 2019',
    responsibilities: [
      'Collaborated closely with vendors to gain insights into products leveraged by Duke Energy, facilitating informed decision-making and optimizing supervisory control and data acquisition (SCADA) technology solutions.',
      'Assisted with the automation of critical daily processes, significantly saving time, and mitigating the risk of human error, resulting in improved operational efficiency.',
      'Contributed to the creation of production pipelines in collaboration with DevOps teams, enhancing agility and scalability in software delivery.'
    ]
  },
  {
    company: 'Duke Energy',
    title: 'IT Associate II – Information Management Solutions',
    date: 'June 2017 – July 2018',
    responsibilities: [
      'Executed individual work assignments encompassing development and support for various business applications, demonstrating proficiency in application and system design.',
      'Effectively addressed complex intra-system issues, ensuring seamless integration and functionality.',
      'Collaborated cross functionally with vendors, project managers, and customers to fulfill requirements and deliver successful project outcomes, fostering productive partnerships.'
    ]
  },
  {
    company: 'Bank of America',
    title: 'Part-Time IT Instructor',
    date: 'Jan 2018 - Dec 2024',
    responsibilities: [
      'Collaborated with the Strategy Development and Investigation Team, playing a pivotal role in updating server configurations and securing access to closed audit databases to facilitate comprehensive audits and investigations.',
      'Conducted thorough interviews and audits to validate controls within the enterprise relationship management, ensuring adherence to regulatory standards and operational excellence.',
      'Played a key role in mitigating critical audit issues, leveraging findings to form actionable conclusions and drive continuous improvement initiatives.',
      'Tested controls surrounding applications and data centers, performing internal Quality Assurance (QA) to uphold the integrity and security of systems.',
      'Supported Business Entity Risk Assessments (BERAs), contributing to the enhancement of QA scores by 81% and bolstering organizational risk management practices.',
    ],
  },
];

  groupedExperience: GroupedExperience[] = [];

  ngOnInit() {
    this.groupedExperience = this.groupExperienceByCompany(this.workExperience);
  }

  private groupExperienceByCompany(experiences: WorkExperience[]): GroupedExperience[] {
    const experienceByCompany = new Map<string, GroupedExperience>();

    for (const experience of experiences) {
      if (!experienceByCompany.has(experience.company)) {
        experienceByCompany.set(experience.company, {
          company: experience.company,
          roles: [],
        });
      }
      experienceByCompany.get(experience.company)!.roles.push({
        title: experience.title,
        date: experience.date,
        responsibilities: experience.responsibilities,
      });
    }

    return Array.from(experienceByCompany.values());
  }
}