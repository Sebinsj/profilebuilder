import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  
  profileForm!: FormGroup;
  userSelectedLanguages:[]=[];

  genders=['Male','Female','Others'];
  languages=['Engilsh','Hindi','Malayalam','Tamil','Others']
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
        lastName:new FormControl(null,Validators.required),
        dateofbirth:new FormControl(null),
        email:new FormControl(null,[Validators.required,Validators.email]),
        gender:new FormControl(null),
        languages:new FormGroup({
          english:new FormControl(false,Validators.requiredTrue),
          hindi:new FormControl(false,Validators.required),
          malayalam:new FormControl(false,Validators.required),
          tamil:new FormControl(false,Validators.required),
          others:new FormControl(false,Validators.required),
        }),

        address:new FormGroup({
          house_no:new FormControl(null),
          street:new FormControl(null),
          city:new FormControl(null,Validators.required),
          state:new FormControl(null,Validators.required),
          pincode:new FormControl(null,[Validators.required, this.pincodeValidator]),
          
        }),
        experience:new FormArray([])


      });
  }
  onAddprofile(profile:any){
    console.log(profile);
    alert('Form Submitted Sucessfully')
    
    
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
  selectedLanguages():void{

    
    
  }

}
