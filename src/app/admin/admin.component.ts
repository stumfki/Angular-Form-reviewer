import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRefService } from '../window-ref.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
   jeAdmin: boolean = false;
   forms: Array<{ firstName: string, lastName: string, address: string, reason: string, rating: number, key: string }> = [];
   numOfPages: number = 0
   
   range: Array<string> = []
   rangeStars = ["1", "2", "3", "4", "5"]


   window: any;

   constructor(private WindowRefService: WindowRefService, private router: Router) {
     const jeAdminValue = localStorage.getItem('jeAdmin');
     if (jeAdminValue === 'true') {
       this.jeAdmin = true;
     }
   }
 


   
 ngOnInit() {

  this.window = this.WindowRefService.nativeWindow;
  if (!this.jeAdmin) {
    this.router.navigate(['/home']);
  } else {
  for (const key in localStorage) {
    if (key.startsWith('vlogaData_')) {
      const formDataString = localStorage.getItem(key);
      if (formDataString !== null) {
        const formData: { firstName: string, lastName: string, address: string, reason: string, rating: number, key: string } = JSON.parse(formDataString);
        formData.key = key
        this.forms.push(formData);
        if(this.window.innerWidth > 1024) {   
        this.numOfPages = Math.ceil(this.forms.length / 2); 
        }
        if(this.window.innerWidth < 1024) {
          this.numOfPages = Math.ceil(this.forms.length); 
        }        
      }
    }
  }
  for(let i = 0; i < this.numOfPages; i++) {
    this.range.push("i")
  }
  }
}

selectedPage: number = 0;
selectedIndexes: number = 0;

addIndex(index: number): void {
  if(this.window.innerWidth > 1024) {
  this.selectedIndexes = this.selectedPage
  this.selectedIndexes = index * 2;
  }

  if(this.window.innerWidth < 1024) {
    this.selectedIndexes = this.selectedPage
    this.selectedIndexes = index;
  }

 
}

pageDown() {
  if(this.window.innerWidth > 1024) {
  if(this.selectedPage !== 0) {
    this.selectedPage = this.selectedPage - 1
    this.selectedIndexes = this.selectedIndexes - 2
  }
}

if(this.window.innerWidth < 1024) {
  if(this.selectedPage !== 0) {
    this.selectedPage = this.selectedPage - 1
    this.selectedIndexes = this.selectedIndexes - 1
  }
}


}

pageUp() {
  if(this.window.innerWidth > 1024) {
  if(this.selectedPage < this.range.length - 1) {
    this.selectedPage = this.selectedPage + 1
    this.selectedIndexes = this.selectedIndexes + 2
  }
}

if(this.window.innerWidth < 1024) {
  if(this.selectedPage < this.range.length - 1) {
    this.selectedPage = this.selectedPage + 1
    this.selectedIndexes = this.selectedIndexes + 1
  }
}

}


rate(objIndex: number, starIndex: number, selectedIndexes: number) {
  const key = this.forms[objIndex + selectedIndexes].key; 
  this.forms[objIndex + selectedIndexes].rating = starIndex + 1; 
  localStorage.setItem(key, JSON.stringify(this.forms[objIndex + selectedIndexes])); 
}


getStarSrc(objIndex: number, starIndex: number, selectedIndexes: number) {
  const key = this.forms[objIndex + selectedIndexes].key;
  const form = localStorage.getItem(key)

  if (this.forms[objIndex + selectedIndexes].rating && starIndex < this.forms[objIndex + selectedIndexes].rating) {
    return 'assets/starfilled.svg';
  } else {
    return 'assets/star.svg';
  }
}



}

