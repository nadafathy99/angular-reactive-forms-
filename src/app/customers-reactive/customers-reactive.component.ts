import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from './customer';

function checkRange( c:AbstractControl ): {[key:string]: boolean} |null {
  if (c.value !== null && (isNaN(c.value) || c.value<1|| c.value>5) ) {
    return  {'range': true}
  }
  return null;
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
    email: ['',[Validators.required,Validators.email]],
    sendCatalog: true,
    phone: '',
    notification: 'email',
    rating: [null, checkRange]
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
