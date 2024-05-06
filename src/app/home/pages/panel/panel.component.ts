import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../utils/task-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskModalComponent } from '../../shared/modals/add-task-modal/add-task-modal.component';
import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit{

  tasks: Task[] = []; 
  tasksToDo: Task[] = []; 
  tasksInProgres: Task[] = []; 
  tasksDone: Task[] = []; 
  contadorIdTareas: number = 0;
  user_id: number = 0;

  constructor( private taskService: TaskService,
               private ngbModal: NgbModal,
  ) {
    
  }

  ngOnInit(): void {
    this.tieneSesion();
  }

  getTask() {
    this.taskService.getTaskByUser(this.user_id).subscribe( (resp) => {
      this.tasks = resp;
      this.divideTasks(this.tasks);
    });
  }

  // Método para agregar una nueva tarea
  addTask() {
    const modalRef = this.ngbModal.open(AddTaskModalComponent, {size: 'md'});
    modalRef.componentInstance.formSubmit.subscribe((formData: any) => {
      if(formData) {
        let newTask = { 
          id : 1,
          title : formData.value.title,
          description : formData.value.description,
          state : "todo",
          create_date : null,
          update_date : null,
          user_id: this.user_id
        }
    
        this.tasksToDo.push(newTask);
        this.taskService.postTask(newTask.title,newTask.description,newTask.state,newTask.user_id).subscribe( resp => {
          this.tasks = []
          this.tasksToDo = []; 
          this.tasksInProgres = []; 
          this.tasksDone = []; 
          if(resp){
            this.getTask();
          }
        });
      }
    });
  }

  divideTasks(tasks: Task[]) {
    if(tasks){
      tasks.forEach( task => {
        (task.id > this.contadorIdTareas) ?  this.contadorIdTareas = task.id : this.contadorIdTareas;
        switch (task.state) {
          case "todo":
            this.tasksToDo.push(task);
            this.ordenarTareasPorId(this.tasksToDo);
            break;
          case "inprogres":
            this.tasksInProgres.push(task);
            this.ordenarTareasPorId(this.tasksInProgres);
            break;
          case "done":
            this.tasksDone.push(task);
            this.ordenarTareasPorId(this.tasksDone);
            break;
          default:
            break;
        }
      })
    }
  }

  onStatusChange(event: any, taskId : number) {
    const newState = event.target.value;
    this.taskService.updateTask(taskId, newState).subscribe((resp: any)  => {
      this.tasks = []
      this.tasksToDo = []; 
      this.tasksInProgres = []; 
      this.tasksDone = []; 
      if(resp){
        this.getTask();
      }
    })
  }

  ordenarTareasPorId(tareas: Task[]): Task[] {
    return tareas.sort((a, b) => a.id - b.id);
  }


  tieneSesion(){
    let sessionId = sessionStorage.getItem('sessionId');
    const userIdString: string | null = sessionStorage.getItem('user_id');

    if (userIdString != null && sessionId) {
        this.user_id = parseInt(userIdString);
        this.getTask();
    }else {
      const modalRef = this.ngbModal.open(LoginModalComponent, {
        size: 'md',
        backdrop: 'static',
        keyboard: false
      });
      modalRef.componentInstance.infoMessage = "Es necesario iniciar sesión para ver el panel de tareas.";
    }
  }
}
