import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Employee} from "./employee";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private backendUrl: string = environment.baseUrl;
    private employees$: Subject<Employee[]> = new Subject<Employee[]>()

    constructor(private http: HttpClient) {
    }

    private refreshEmployees = () => {
        this.http.get<Employee[]>(`${this.backendUrl}/employees`).subscribe(
            employees => {
                this.employees$.next(employees);
            }
        )
    }

    getEmployees = (): Subject<Employee[]> => {
        this.refreshEmployees();
        return this.employees$;
    }

    getEmployeeById = (id: string): Observable<Employee> => {
        return this.http.get<Employee>(`${this.backendUrl}/employees/${id}`);
    }

    createEmployee(employee: Employee): Observable<string> {
        return this.http.post(`${this.backendUrl}/employees`, employee, {responseType: 'text'});
    }

    updateEmployee(id: string, employee: Employee): Observable<string> {
        return this.http.put(`${this.backendUrl}/employees/${id}`, employee, {responseType: 'text'});
    }

    deleteEmployee(id: string | undefined): Observable<string> {
        return this.http.delete(`${this.backendUrl}/employees/${id}`, {responseType: 'text'});
    }

}
