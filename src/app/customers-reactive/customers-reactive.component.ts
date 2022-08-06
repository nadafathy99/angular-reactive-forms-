import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Customer } from './customer';

function emailMatcher(c: AbstractControl) : {[key:string]:boolean}|null {
  const email = c.get('email');
  const confirmEmail= c.get('confirmEmail');
  if (email?.pristine|| confirmEmail?.pristine) return null;
  if (email?.value=== confirmEmail?.value) return null;
  return {'match':true}
}

function checkRange (min:number, max: number): ValidatorFn{
  return ( c:AbstractControl ): {[key:string]: boolean} |null =>{
    if (c.value !== null && (isNaN(c.value) || c.value< min|| c.value>max) ) {
      return  {'range': true}
    }
    return null;
  }
}


@Component({
  selector: 'app-customers-reactive',
  templateUrl: './customers-reactive.component.html',
  styleUrls: ['./customers-reactive.component.css']
})

export class CustomersReactiveComponent implements OnInit {

  customer = new Customer();
  customerForm = this.fb.group({
    firstName: ['',[Validators.required,Validators.minLength(3)]],
    lastName: {value:'', disabled:true},
    emailGroup : this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      confirmEmail: ['', Validators.required],
    }, {validator: emailMatcher}),
    sendCatalog: true,
    phone: '',
    notification: 'email',
    rating: [null, checkRange(1,5)]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm?.value));
  }

  /**
   * setValue vs. patchValue
   * setValue : set values to ALL form controls, otherwise, ERROR
   * patchVlue: set values to specific form controls
   */
  populate() {
    this.customerForm.patchValue({
      firstName: 'nada',
      lastName: 'ahmed',
    })
  }
  setNotification(notify:string){
    const phoneControl = this.customerForm.get('phone')
    if (notify=== 'text'){
      phoneControl?.setValidators(Validators.required);
    }
    else{
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
