import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AllSetupService} from '../../services/all-setup.service';
import {SharedDataService} from '../../services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor( private service : AllSetupService, private router : Router, private sharedData : SharedDataService) { 
    this.usernameCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    })
  }

  ngOnInit() {
  }

  login(){
    let obj = this.loginForm.value;
    obj['forcedLogin'] = 'yes';
    obj.password = btoa(obj.password);
    this.service.loginService(obj).subscribe(data =>{
      if(data){
        sessionStorage.setItem('token', data['authToken']);
        sessionStorage.setItem('loginData', JSON.stringify(data));
        this.sharedData.setSessionData(data);
        this.router.navigate(['/home']);
      }
    })
  }
}
