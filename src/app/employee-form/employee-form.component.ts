import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormValidatorPipe} from "../employee/form-validator.pipe";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Employee} from "../employee/employee";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        FormValidatorPipe,
        NgIf,
        ReactiveFormsModule
    ],
    templateUrl: './employee-form.component.html',
    styles: ``
})
export class EmployeeFormComponent implements OnInit {

    @Input('initialState')
    initialState: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({});

    // event emitter
    @Output('formSubmitted')
    eventEmitter: EventEmitter<Employee> = new EventEmitter<Employee>();

    // form
    protected employeeForm!: FormGroup;
    // form controls
    protected nameControl!: FormControl;
    protected positionControl!: FormControl;
    protected levelControl!: FormControl;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.initialState.subscribe((employee: Employee) => {
            this.buildForm(employee);
        });
    }

    private buildForm(exisingEmployee: Employee): void {
        // initiate controls
        this.nameControl = new FormControl(exisingEmployee!.name || '', {
            updateOn: 'blur',
            validators: [Validators.required, Validators.minLength(3)]
        });

        this.positionControl = new FormControl(exisingEmployee!.position || '', Validators.required);
        this.levelControl = new FormControl(exisingEmployee!.level || '', Validators.required);

        // build form
        this.employeeForm = this.formBuilder.group({
            name: this.nameControl,
            position: this.positionControl,
            level: this.levelControl
        });
    }

    protected onSubmit(): void {
        const employee: Employee = this.employeeForm.value;
        this.eventEmitter.emit(employee);
    }
}
