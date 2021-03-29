import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController} from '@ionic/angular';
import { AuthtificationtokenService } from '../../services/authtificationtoken.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({

  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 public  loading;
  registerCredentials = { username: '', password: '' };
  credentialsForm: FormGroup;

 

  constructor(public menuCtrl: MenuController,private formBuilder: FormBuilder, private authService: AuthtificationtokenService,public loadingController: LoadingController
   ) {
    this.menuCtrl.enable(false);

   }
  


  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  onSubmit() {
   console.log(this.credentialsForm.value);
   this.authService.login(this.credentialsForm.value);
  }

  ngOnInit() {
    
    this.credentialsForm = this.formBuilder.group({
      username: [''],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });


  }


  ionViewWillLeave(){}



}
