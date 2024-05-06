import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../shared/response/login-response";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl: string = environment.mainUrl;
    
    constructor(private http: HttpClient) {}

    //REGISTER
    register(username: string, pass: string, phone: number, age: number, gender: string) {
        return this.http.post<any>(`${this.baseUrl}/user`, {username, pass, phone,age,gender});
    }

    //USER-EXIST
    userExist(username: string) {
        return this.http.get(`${this.baseUrl}/user/exists/${username}`, { responseType: 'text' });
    }

    //USER-EXIST
    login(username: string, pass: string) : Observable<LoginResponse> { 
        return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`,{username, pass});
    }
    
}
