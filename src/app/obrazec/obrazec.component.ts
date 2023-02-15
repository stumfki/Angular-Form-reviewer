import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-obrazec',
  templateUrl: './obrazec.component.html',
  styleUrls: ['./obrazec.component.sass']
})
export class ObrazecComponent {
  vloga: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.vloga = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      reason: ['', Validators.required],
      rating:[0]
    })
  }

 
    isHomeRoute() {
      return this.router.url === '/home';
    }

    vlogaOddana: boolean = false
    formSubmitted: boolean = false;
    isAdmin = localStorage.getItem('isAdmin') === 'true';
    

    saveForm() {
      this.formSubmitted = true;
      if (this.vloga.valid) {
        const formKey = 'vlogaData_' + Date.now().toString();   
        const formData = JSON.stringify(this.vloga.value);
        localStorage.setItem(formKey, formData);
        this.vlogaOddana = true;
      }
    }
    

    ponovnoOddaj() {
      this.vlogaOddana = false
    }
}
