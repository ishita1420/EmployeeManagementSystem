// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-project',
//   imports: [],
//   templateUrl: './project.component.html',
//   styleUrl: './project.component.css'
// })
// export class ProjectComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../project.service';
 
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectName = '';
  clientName = '';
  startDate = '';
  leadBy = '';
  projects: any[] = [];
  isEditing = false;
  editId: number | null = null;
 
  constructor(private projectService: ProjectService) {}
 
  ngOnInit(): void {
    this.loadProjects();
  }
 
  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
 
  saveProject() {
    const projectData = {
      name: this.projectName,
      client: this.clientName,
      date: this.startDate,
      lead: this.leadBy
    };
 
    if (this.isEditing && this.editId !== null) {
      this.projectService.updateProject(this.editId, projectData).subscribe(() => {
        this.loadProjects();
        this.resetForm();
      });
    } else {
      this.projectService.addProject(projectData).subscribe(() => {
        this.loadProjects();
        this.resetForm();
      });
    }
  }
 
  editProject(project: any) {
    this.projectName = project.name;
    this.clientName = project.client;
    this.startDate = project.date;
    this.leadBy = project.lead;
    this.isEditing = true;
    this.editId = project.id;
  }
 
  deleteProject(project: any) {
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.loadProjects();
      this.resetForm();
    });
  }
 
  resetForm() {
    this.projectName = '';
    this.clientName = '';
    this.startDate = '';
    this.leadBy = '';
    this.isEditing = false;
    this.editId = null;
  }
}