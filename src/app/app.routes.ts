import {Routes} from '@angular/router';
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import {AddEmployeeFormComponent} from "./add-employee-form/add-employee-form.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full'},
    {path: 'employees', component: EmployeesListComponent},
    {path: 'employees/new', component: AddEmployeeFormComponent},
    {path: 'employees/edit/:id', component: EditEmployeeComponent}
];
