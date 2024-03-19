import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../Services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  selectedFile: File;
  constructor(private profileService:ProfileService,private router:Router){}
  
  profileForm!: FormGroup;
  userSelectedLanguages:[]=[];

  count=0;
  languageSelected:boolean=false;

  genders=['Male','Female','Others'];
  languagesList:string[]=['english','hindi','malayalam','tamil','others']
  cities=['a','b','c','d'];
  states=['a','b','c','d'];
  get addexp(){
    return (<FormArray> this.profileForm.get('experience')).controls

  }

   pincodeValidator(control: FormControl): { [key: string]: any } | null {
    const validPattern = /^\d{6}$/; // Regular expression for 6 digits

    if (control.value && !validPattern.test(control.value)) {
        return { 'invalidPincode': true }; // Return validation error if pincode doesn't match pattern
    }

    return null; // Return null if validation succeeds
}

  ngOnInit(): void {
      this.profileForm=new FormGroup({
        firstName: new FormControl(null,Validators.required),
        lastName:new FormControl(null),
        dateofbirth:new FormControl(null,Validators.required),
        email:new FormControl(null,[Validators.required,Validators.email]),
        gender:new FormControl(null,Validators.required),

        // profileImage: new FormControl(null),

        languages:new FormGroup({
          english:new FormControl(false,Validators.required),
          hindi:new FormControl(false,Validators.required),
          malayalam:new FormControl(false,Validators.required),
          tamil:new FormControl(false,Validators.required),
          others:new FormControl(false,Validators.required),
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

  //Profile Add
  onAddprofile(profile:any){
    console.log(profile);
    alert('Form Submitted Sucessfully')
    this.profileService.createProfile(profile).subscribe((res)=>{
      this.router.navigate(['/'])

    })
    
    
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
    (this.profileForm.get('experience') as FormArray).push(newExp);
  }
  
  onExpRemove(index:any):void{
    (this.profileForm.get('experience')as FormArray).removeAt(index);

  }
  onReset(){
   
    this.profileForm.reset()
  }
  checkboxchange(event:any){
    if(event.target.checked){
      this.count+=1
      console.log(this.count);
      
    }
    else{
      this.count-=1
      console.log(this.count);
      
    }
    if(this.count>0){
      this.languageSelected=true
    }
    else{
      this.languageSelected=false
    }
  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     this.profileForm.patchValue({
  //       profileImage: file
  //     });
  //   }
  // }

}
