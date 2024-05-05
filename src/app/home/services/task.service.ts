import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Task } from "../utils/task-interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    baseUrl: string = environment.mainUrl;
    
    constructor(private http: HttpClient) {}

    getTask() : Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/task`);
    }

    postTask(title: string, description: string, state: string) {
        return this.http.post(`${this.baseUrl}/task`, {title,description,state});
    }

    updateTask(id: number, newState: string){
        return this.http.put(`${this.baseUrl}/task/${id}`, newState);
    }
}