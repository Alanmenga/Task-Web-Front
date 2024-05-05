import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css'
})
export class AddTaskModalComponent {
  addTaskForm: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal) {
    ;
    this.addTaskForm = this.fb.group({
      id: [],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  agregarTarea() {
    this.formSubmit.emit(this.addTaskForm);
    this.activeModal.close();
  }



}
