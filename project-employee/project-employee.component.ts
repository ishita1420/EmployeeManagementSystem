// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ProjectEmployeeService, ProjectEmployee } from '../projectemployee.service';
 
// @Component({
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   selector: 'app-project-employee',
//   templateUrl: './project-employee.component.html',
//   styleUrls: ['./project-employee.component.css']
// })
// export class ProjectEmployeeComponent implements OnInit {
//   projectId: number = 0;
//   empId: number = 0;
//   assignedDate: string = '';
//   roleProjectEmployee: string = '';
//   isActive: boolean = true;
 
//   employees: ProjectEmployee[] = [];
//   editIndex: number | null = null;
 
//   constructor(private projectEmployeeService: ProjectEmployeeService) {}
 
//   ngOnInit(): void {
//     this.loadEmployees();
//   }
 
//   loadEmployees(): void {
//     this.projectEmployeeService.getAll().subscribe({
//       next: (data) => this.employees = data,
//       error: (err) => console.error('Error loading employees:', err)
//     });
//   }
// onSubmit() {
//     const newEntry: ProjectEmployee = {
//       id: this.editIndex !== null ? this.employees[this.editIndex].id : Date.now().toString(), // Use existing id if updating
//       empProjectId: Date.now(),
//       projectId: this.projectId,
//       empId: this.empId,
//       assignedDate: this.assignedDate,
//       role: this.roleProjectEmployee,
//       isActive: this.isActive
//     };
 
//     if (this.editIndex !== null) {
//       const existingId = this.employees[this.editIndex].id; // Use 'id' for update
//       this.projectEmployeeService.update(existingId, newEntry).subscribe({
//         next: () => {
//           this.loadEmployees();
//           this.editIndex = null;
//           this.resetForm();
//         },
//         error: (err) => console.error('Update failed:', err)
//       });
//     } else {
//       this.projectEmployeeService.add(newEntry).subscribe({
//         next: () => {
//           this.loadEmployees();
//           this.resetForm();
//         },
//         error: (err) => console.error('Add failed:', err)
//       });
//     }
//   }
 
 
//   onEdit(index: number) {
//     const emp = this.employees[index];
//     this.projectId = emp.projectId;
//     this.empId = emp.empId;
//     this.assignedDate = emp.assignedDate;
//     this.roleProjectEmployee = emp.role;
//     this.isActive = emp.isActive;
//     this.editIndex = index;
//   }
 
 
//   onDelete(index: number) {
   
//     const idToDelete: any = this.employees[index].id;
//     this.projectEmployeeService.delete(idToDelete).subscribe({
//       next: () => {
//         this.loadEmployees();
//         if (this.editIndex === index) {
//           this.resetForm();
//           this.editIndex = null;
//         }
//       },
//       error: (err) => console.error('Delete failed:', err)
//     });
//   }
 
 
//   resetForm() {
//     this.projectId = 0;
//     this.empId = 0;
//     this.assignedDate = '';
//     this.roleProjectEmployee = '';
//     this.isActive = true;
//   }
// }
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
 
// @Component({
//   selector: 'app-project-employee',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './project-employee.component.html',
// })
// export class ProjectEmployeeComponent {
//   projectId: string = '';
//   empname: string = '';
//   assignedDate: string = '';
//   roleProjectEmployee: string = '';
//   editIndex: number | null = null;
 
//   employees: any[] = [];
//   projects: any[] = [];
//   matchedRecords: any[] = [];
 
//   constructor(private http: HttpClient) {}
 
//   ngOnInit() {
//     // Fetch employees
//     this.http.get<any[]>('http://localhost:3000/employees').subscribe((data) => {
//       this.employees = data || [];
//       console.log('Loaded employees:', this.employees);
 
//       // Fetch projects after employees are loaded
//       this.http.get<any[]>('http://localhost:3000/project').subscribe((projectData) => {
//         this.projects = projectData || [];
//         console.log('Loaded projects:', this.projects);
 
//         //this.matchProjectEmployee();
//       });
//     });
//   }
 
//   matchProjectEmployee() {
//     this.matchedRecords = [];
 
//     this.projects.forEach((project, index) => {
//       const leadName = project.Leadbyemployee?.trim().toLowerCase();
//       const matchedEmployee = this.employees.find(emp => emp.name?.trim().toLowerCase() === leadName);
 
//       if (matchedEmployee) {
//         this.matchedRecords.push({
//           empProjectId: index + 1,
//           projectId: project.projectId,
//           empname: matchedEmployee.name,
//           contact: matchedEmployee.contact,
//           email: matchedEmployee.email,
//           department: matchedEmployee.department,
//           assignedDate: project['start-date'],
//           role: matchedEmployee.role,
//           isActive: true
//         });
//       }
//     });
//   }
// onSubmit() {
 
//     const inputName = this.empname.trim().toLowerCase();
//     const inputProjectId = this.projectId.toString().trim();
//     const inputAssignedDate = this.assignedDate.trim();
//     const inputRole = this.roleProjectEmployee.trim().toLowerCase();
 
//     // Find employee by name and role
//     const matchedEmployee = this.employees.find(emp =>
//       emp.name?.trim().toLowerCase() === inputName &&
//       emp.role?.trim().toLowerCase() === inputRole
//     );
 
//     // Find project by ID and lead name
//     const matchedProject = this.projects.find(proj =>
//       proj.projectId?.toString().trim() === inputProjectId &&
//       proj.Leadbyemployee?.trim().toLowerCase() === inputName
//     );
 
//     // Validate assigned date
//     const isDateMatch = matchedProject?.['start-date']?.trim() === inputAssignedDate;
 
//     if (!matchedEmployee || !matchedProject || !isDateMatch) {
//       alert(`Invalid data. Please make sure all fields match the employee and project records.`);
//       return;
//     }
 
//     const newRecord = {
//       empProjectId: this.editIndex !== null ? this.matchedRecords[this.editIndex].empProjectId : this.generateUniqueId(),
//       projectId: matchedProject.projectId,
//       empname: matchedEmployee.name,
//       contact: matchedEmployee.contact,
//       email: matchedEmployee.email,
//       department: matchedEmployee.department,
//       assignedDate: matchedProject['start-date'],
//       role: matchedEmployee.role,
//       isActive: true
//     };
 
//     if (this.editIndex !== null) {
//       this.matchedRecords[this.editIndex] = newRecord;
//       this.editIndex = null;
//     } else {
//       this.matchedRecords.push(newRecord);
//     }
 
//     this.resetForm();
//   }
 
 
 
 
//   resetForm() {
//     this.projectId = '';
//     this.empname = '';
//     this.assignedDate = '';
//     this.roleProjectEmployee = '';
//     this.editIndex = null;
//   }
 
//   generateUniqueId(): number {
//     return this.matchedRecords.length > 0
//       ? Math.max(...this.matchedRecords.map(e => +e.empProjectId || 0)) + 1
//       : 1;
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-employee.component.html',
  styleUrls: ['./project-employee.component.css']
})
export class ProjectEmployeeComponent {
  client: string = '';
  empname: string = '';
  assignedDate: string = '';
  roleProjectEmployee: string = '';
  editIndex: number | null = null;
 
  employees: any[] = [];
  projects: any[] = [];
  matchedRecords: any[] = [];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe((data) => {
      this.employees = data || [];
      console.log('Loaded employees:', this.employees);
 
      this.http.get<any[]>('http://localhost:3000/projects').subscribe((projectData) => {
        this.projects = projectData || [];
        console.log('Loaded projects:', this.projects);
      });
    });
  }
 
  matchProjectEmployee() {
    this.matchedRecords = [];
 
    this.projects.forEach((project, index) => {
      const leadName = project.lead?.trim().toLowerCase();
      const matchedEmployee = this.employees.find(emp =>
        emp.name?.trim().toLowerCase() === leadName
      );
 
      if (matchedEmployee) {
        this.matchedRecords.push({
          empProjectId: index + 1,
          client: project.client,
          empname: matchedEmployee.name,
          contact: matchedEmployee.contact,
          email: matchedEmployee.email,
          department: matchedEmployee.department,
          assignedDate: project.date,
          role: matchedEmployee.role,
          isActive: true
        });
      }
    });
  }
 
  onSubmit() {
    const inputName = this.empname.trim().toLowerCase();
    const inputClient = this.client.trim().toLowerCase();
    const inputAssignedDate = this.assignedDate.trim();
    const inputRole = this.roleProjectEmployee.trim().toLowerCase();
 
    const matchedEmployee = this.employees.find(emp =>
      emp.name?.trim().toLowerCase() === inputName
    );
 
    const matchedProject = this.projects.find(proj =>
      proj.client?.trim().toLowerCase() === inputClient
    );
 
    const normalizeDate = (d: string) => new Date(d).toISOString().split('T')[0];
    const isDateMatch = matchedProject?.date
      ? normalizeDate(matchedProject.date) === normalizeDate(inputAssignedDate)
      : false;
 
    const isRoleMatch = matchedEmployee?.role?.trim().toLowerCase() === inputRole;
 
    if (!matchedEmployee || !matchedProject || !isDateMatch || !isRoleMatch) {
      alert(`Invalid data. Please make sure all fields match the employee and project records.`);
      return;
    }
 
    const newRecord = {
      empProjectId: this.editIndex !== null ? this.matchedRecords[this.editIndex].empProjectId : this.generateUniqueId(),
      client: matchedProject.client,
      empname: matchedEmployee.name,
      contact: matchedEmployee.contact,
      email: matchedEmployee.email,
      department: matchedEmployee.department,
      assignedDate: matchedProject.date,
      role: matchedEmployee.role,
      isActive: true
    };
 
    if (this.editIndex !== null) {
      this.matchedRecords[this.editIndex] = newRecord;
      this.editIndex = null;
    } else {
      this.matchedRecords.push(newRecord);
    }
 
    this.resetForm();
  }
 
  resetForm() {
    this.client = '';
    this.empname = '';
    this.assignedDate = '';
    this.roleProjectEmployee = '';
    this.editIndex = null;
  }
 
  generateUniqueId(): number {
    return this.matchedRecords.length > 0
      ? Math.max(...this.matchedRecords.map(e => +e.empProjectId || 0)) + 1
      : 1;
  }
}
 
 