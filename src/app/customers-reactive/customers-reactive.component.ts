import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'app-customers-reactive',
  templateUrl: './customers-reactive.component.html',
  styleUrls: ['./customers-reactive.component.css']
})
export class CustomersReactiveComponent implements OnInit {

  customer = new Customer();
  customerForm!: FormGroup ;
  constructor() { }

  ngOnInit(): void {
    this.customerForm= new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    })
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
