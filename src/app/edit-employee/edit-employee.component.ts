import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee/employee.service";
import {BehaviorSubject} from "rxjs";
import {Employee} from "../employee/employee";
import {EmployeeFormComponent} from "../employee-form/employee-form.component";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-edit-employee',
    standalone: true,
    imports: [
        EmployeeFormComponent,
        NgIf
    ],
    templateUrl: './edit-employee.component.html',
    styles: ``
})
export class EditEmployeeComponent implements OnInit {

    protected employee: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({});
    private id!: string;

    // error message flag
    protected showErrMsg = false;
    protected errMsg!: string;

    constructor(private router: Router, private route: ActivatedRoute,
                private service: EmployeeService) {
    }

    ngOnInit(): void {
        // get id params from route
        this.id = this.route.snapshot.paramMap.get('id')!;

        this.service.getEmployeeById(this.id).subscribe((employee: Employee) => {
            this.employee.next(employee);
        })
    }

    protected editEmployee(employee: Employee): void {
        this.service.updateEmployee(this.id, employee).subscribe({
                next: () => {
                    this.router.navigate(['/employees']);
                },
                error: (error) => {
                    this.showErrMsg = true;
                    this.errMsg = `unable to update employee. error: ${error.message}`;
                    console.error(error);
                }
            }
        )
    }
}
