import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
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
  customerForm!:FormGroup;
  emailMessage!:string;
  private validationMessages :any = {
    required:'Email is required',
    email: 'Please enter a valid email',
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: {value:'', disabled:true},
      emailGroup : this.fb.group({
        email: ['',[Validators.required,Validators.email]],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}),
      sendCatalog: true,
      phone: '',
      notification: 'email',
      rating: [null, checkRange(1,5)],
      addresses: this.fb.array([this.buildAddress()]),
    })

    // By using a watcher to change the validation, we no longer rely on the HTML to notify us of changes to the input element.
    const notificationControl= this.customerForm.get('notification');
    notificationControl?.valueChanges.subscribe((change)=> this.setNotification(change));

    const emailControl = this.customerForm.get('email');
    emailControl?.valueChanges.pipe(
      debounceTime(1000),
    ) .subscribe(()=> this.setMessage(emailControl));
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm?.value));
  }

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

  setMessage(c:AbstractControl){
    this.emailMessage='';
    if ((c.touched||c.dirty) && c.errors){
      this.emailMessage= Object.keys(c.errors).map((key)=>this.validationMessages[key]).join('') as string
    }
  }

  buildAddress():FormGroup{
    return this.fb.group({
      addressType: 'home',
      street1:['',Validators.required],
      street2:['',Validators.required],
      city:[''],
      state:[''],
      zip:[''],
    })
  }

  get addresses():FormArray{
    // we use a cast operator here to cast it to the desired type; otherwise, the type is an AbstractControl.
    return <FormArray> this.customerForm.get('addresses');
  }

  addAddress(){
    this.addresses.push(this.buildAddress());
  }
}
