import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  jeAdmin: boolean = false;
  @ViewChild('username') usernameRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;

  constructor(private router: Router) {
    const jeAdminValue = localStorage.getItem('jeAdmin');
    if (jeAdminValue === 'true') {
      this.jeAdmin = true;
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  ngOnInit() {

    if (this.jeAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  oddaj() {
    
    const usernameValue = this.usernameRef.nativeElement.value;
    const passwordValue = this.passwordRef.nativeElement.value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (usernameValue && passwordValue) {
      localStorage.setItem('jeAdmin', 'true');
      console.log(localStorage.getItem('jeAdmin'));
      this.navigateToAdmin()

      setTimeout(() => {
        localStorage.setItem('jeAdmin', 'false');
        console.log(localStorage.getItem('jeAdmin'));
      }, 24 * 60 * 60 * 1000); 
    } else {
      alert('Prosim vnesite podatke!');
    }
  }



}
