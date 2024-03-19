import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn:"root"})
export class ProfileService{
    constructor(private http:HttpClient){

    }

    createProfile(profile){
       return this.http.post('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles.json',profile)
    }
}