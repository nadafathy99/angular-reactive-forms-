import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'app-customers-reactive',
  templateUrl: './customers-reactive.component.html',
  styleUrls: ['./customers-reactive.component.css']
})
export class CustomersReactiveComponent implements OnInit {

  customer = new Customer();
  customerForm = this.fb.group({
    firstName: '',
    lastName: {value:'', disabled:true},
    email: [''],
    sendCatalog: true,
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
}
