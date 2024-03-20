import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../Services/profile.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  selectedProfileId:string='';
  selectedProfile:any;
  isFetching:boolean=false;
  selectedLanguages:any;

  selectedLanguagesLength=0;
profileForm: any;
  
constructor(private route:ActivatedRoute,private profileService:ProfileService, private router:Router){}
  ngOnInit(){
    this.isFetching=true
    this.selectedProfileId=this.route.snapshot.paramMap.get('id');
    if(this.selectedProfileId){
      

      this.profileService.getTaskbyId(this.selectedProfileId).subscribe((res)=>{
        this.selectedProfile=res
        this.isFetching=false
        this.selectedLanguages = Object.keys(this.selectedProfile.languages)
        .filter(lang => this.selectedProfile.languages[lang]);
        // console.log('languages',this.selectedLanguages);
        this.selectedLanguagesLength=this.selectedLanguages.length
        // console.log(this.selectedLanguagesLength);
        console.log(this.selectedProfile);
        
        console.log('selecetd profile ex:',this.selectedProfile.experience);
        console.log('selecetd profile first exp:',this.selectedProfile.experience[0]);
        
           
      })
      
    }
    
  }
  
  viewEdit(){
    this.router.navigate(['EditProfile',this.selectedProfileId,this.selectedLanguagesLength])

  }

}
