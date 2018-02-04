import { Component, OnInit } from '@angular/core';
import {FormDataService} from "../data/formData.service";
import {Step3} from "../data/formData.model";

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  title = 'Step 3';
  step3:Step3;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.step3 = this.formDataService.getStep3Info();
    console.log("Step 3 information loaded");
  }

  save(form: any) {
    if (!form.valid) {
      return;
    }
    this.formDataService.setStep3Info(this.step3);
  }

}
