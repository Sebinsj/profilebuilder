import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Profile } from "../Models/profile.model";


@Injectable({providedIn:"root"})
export class ProfileService{
    constructor(private http:HttpClient){

    }

    createProfile(profile){
       return this.http.post('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles.json',profile)
    }

    getProfiles(){
        return this.http.get <{[key:string]:Profile}>('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles.json')
       .pipe(map((res)=>{
       const profiles=[];  
       for(const key in res){
         if(res.hasOwnProperty(key)){
            profiles.push({...res[key],id:key})
         }
         }
         return profiles
       }))
       
           
       }
       getTaskbyId(id:string){
         return this.http.get<Profile>('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles/'+id+'.json')
  
      }
  

       deleteProfile(id:string){
        return this.http.delete('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles/'+id+'.json')
       }
       
       editProfile(id,value){
         return this.http.put('https://profilebuilderbyssj-default-rtdb.firebaseio.com/profiles/'+id+'.json',value)
       
       }
}