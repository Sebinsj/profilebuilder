import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../Services/profile.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private profileService:ProfileService,private router:Router,private route :ActivatedRoute){
    this.profileFormEdit=new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName:new FormControl(null),
      dateofbirth:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      gender:new FormControl(null,Validators.required),

      // profileImage: new FormControl(null),

      languages:new FormGroup({
        english:new FormControl(false),
        hindi:new FormControl(false),
        malayalam:new FormControl(false),
        tamil:new FormControl(false),
        others:new FormControl(false),
      }),

      address:new FormGroup({
        house_no:new FormControl(null,Validators.required),
        street:new FormControl(null),
        city:new FormControl(null,Validators.required),
        state:new FormControl(null,Validators.required),
        pincode:new FormControl(null,[Validators.required, this.pincodeValidator]),
        
      }),
      experience:new FormArray([])


    });
  }
  
  profileFormEdit!: FormGroup;
  userSelectedLanguages:[]=[];
  exp:any;

  
  languageSelected:boolean=false;

  genders=['Male','Female','Others'];
  languagesList:string[]=['english','hindi','malayalam','tamil','others']
  cities=['Ahmedabad','Amritsar','Bangalore','Cochin'];
  states=["Andhra Pradesh","Arunachal Pradesh ","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Lakshadweep","National Capital Territory of Delhi","Puducherry"];
  profileId:string='';
  selectedLanguageCount:any
  selectedProfile:any;
  selectedProfileId:string='';
  expArray:any;
  
  
  
  get addexp(){
    return (<FormArray> this.profileFormEdit.get('experience')).controls

  }
  ngOnInit(){
    this.profileId=this.route.snapshot.paramMap.get('id');
    this.selectedLanguageCount=this.route.snapshot.paramMap.get('len');
    console.log('count',this.selectedLanguageCount);
   
      if (this.selectedLanguageCount>0){
        this.languageSelected=true
      }
      else{
        this.languageSelected=false;
      }

    if(this.profileId){
      this.profileService.getTaskbyId(this.profileId).subscribe((res)=>{
        this.selectedProfile=res
        console.log(this.selectedProfile);
        this.selectedProfileId=this.profileId,
        
        this.profileFormEdit.patchValue({
          
          firstName:this.selectedProfile.firstName,
          lastName:this.selectedProfile.lastName,
          dateofbirth:this.selectedProfile.dateofbirth,
          email:this.selectedProfile.email,
          gender:this.selectedProfile.gender,
          languages:{
            english:this.selectedProfile.languages.english,
            hindi:this.selectedProfile.languages.hindi,
            malayalam:this.selectedProfile.languages.malayalam,
            tamil:this.selectedProfile.languages.tamil,
            others:this.selectedProfile.languages.others,
          },

          address: {
            house_no: this.selectedProfile.address.house_no,
            street: this.selectedProfile.address.street,
            city: this.selectedProfile.address.city,
            state: this.selectedProfile.address.state,
            pincode: this.selectedProfile.address.pincode,
          },
          experience:this.selectedProfile.experience?.forEach((exp:any)=>{
            this.exp=exp
             this.onExpEdit()
             console.log('exp',exp);
             
            
            
          })


        })
        


      })
      
    }
    
    


  }

   pincodeValidator(control: FormControl): { [key: string]: any } | null {
    const validPattern = /^\d{6}$/; // Regular expression for 6 digits

    if (control.value && !validPattern.test(control.value)) {
        return { 'invalidPincode': true }; // Return validation error if pincode doesn't match pattern
    }

    return null; // Return null if validation succeeds
}
onExpAdd(): void {
  const newExp = new FormGroup({
    companyname: new FormControl(null, Validators.required), // Initialize companyname FormControl
    position: new FormControl(null, Validators.required),
    years: new FormGroup({
      dateofjoining: new FormControl(null, Validators.required),
      dateofresign: new FormControl(null, Validators.required),
    }),
  });
  (this.profileFormEdit.get('experience') as FormArray).push(newExp);
}

onExpRemove(index:any):void{
  (this.profileFormEdit.get('experience')as FormArray).removeAt(index);

}
onExpEdit(){
  const newExp = new FormGroup({
    companyname: new FormControl(this.exp.companyname, Validators.required),
    position: new FormControl(this.exp.position, Validators.required),
    years: new FormGroup({
      dateofjoining: new FormControl(this.exp.years.dateofjoining, Validators.required),
      dateofresign: new FormControl(this.exp.years.dateofresign, Validators.required),
    }),
  });
  (this.profileFormEdit.get('experience') as FormArray).push(newExp);

  
}
checkboxchange(event:any){
  if(event.target.checked){
    this.selectedLanguageCount+=1
    console.log(this.selectedLanguageCount);
    
  }
  else{
    this.selectedLanguageCount-=1
    console.log(this.selectedLanguageCount);
    
  }
  if(this.selectedLanguageCount>0){
    this.languageSelected=true
  }
  else{
    this.languageSelected=false
  }
}

onEditProfile(){
  this.profileService.editProfile(this.profileId,this.profileFormEdit.value).subscribe(()=>{
    this.router.navigate(['/'])

  })
}



}
