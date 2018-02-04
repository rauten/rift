import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { UsersessionsService} from "../../usersessions.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  title = "Your session has been created on The Rift";
  @Input() formData: FormData;
  isFormValid: boolean = false;

  constructor(private formDataService: FormDataService, private userSessionService: UsersessionsService) { }

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    this.isFormValid = this.formDataService.isFormValid();
    console.log('Result feature loaded!');
  }

  submit() {
    alert('Excellent Job!');
    console.log(this.formData);
    this.userSessionService.createUserSession(this.formData);
    this.formData = this.formDataService.resetFormData();
    this.isFormValid = false;
  }
}
