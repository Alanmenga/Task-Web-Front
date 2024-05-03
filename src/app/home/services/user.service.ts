import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";


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
    
}
