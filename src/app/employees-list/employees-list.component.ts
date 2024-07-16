import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee/employee.service";
import {Observable} from "rxjs";
import {Employee} from "../employee/employee";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-employees-list',
    standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        RouterLink,
        NgIf
    ],
    templateUrl: './employees-list.component.html',
    styles: ``
})
export class EmployeesListComponent implements OnInit {

    protected employees$: Observable<Employee[]> = new Observable<Employee[]>();
    // a separate object to track removal status for buttons
    protected removalInProgress: any = {};

    constructor(private service: EmployeeService) {
    }

    ngOnInit(): void {
        this.employees$ = this.service.getEmployees();
    }


    protected onClickDelete(_id: string | undefined) {
        this.removalInProgress[`${_id}`] = true;
        this.service.deleteEmployee(_id).subscribe({
            next: () => {
                this.employees$ = this.service.getEmployees();
                delete this.removalInProgress[`${_id}`];
            },
            error: () => {
                delete this.removalInProgress[`${_id}`];
            }
        })
    }
}
