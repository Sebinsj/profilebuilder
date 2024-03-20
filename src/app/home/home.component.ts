import { Component, OnInit } from '@angular/core';
import { Profile } from '../Models/profile.model';
import { ProfileService } from '../Services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allProfiles:Profile[]=[];
  isFetching:boolean=false;

  constructor(private ProfileService:ProfileService,private route:Router){

  }
  ngOnInit(): void {
    this.fetchProfiles();
      
  }
  private fetchProfiles(){
    this.isFetching=true;
    this.ProfileService.getProfiles().subscribe((profiles)=>{
      this.allProfiles=profiles;
      console.log(this.allProfiles);
      this.isFetching=false
      

    })
  }

  onDeleteProfile(id:string){
    this.ProfileService.deleteProfile(id).subscribe(()=>{
      this.fetchProfiles()
    })
  }
  onViewProfile(id:string){
    this.route.navigate(['ViewProfile',id])
  }

}
