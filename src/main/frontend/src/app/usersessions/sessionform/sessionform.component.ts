import { Component, OnInit, Input } from '@angular/core';
import {FormDataService} from "./data/formData.service";
import {Step2, Step1, Step3} from "./data/formData.model";

@Component({
  selector: 'app-sessionform',
  templateUrl: './sessionform.component.html',
  styleUrls: ['./sessionform.component.scss']
})
export class SessionformComponent implements OnInit {
  step1Title = 'Step 1';
  step2Title = 'Step 2';
  step3Title = 'Step 3';
  step1: Step1;
  step2: Step2;
  step3: Step3;
  @Input() formData;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.step1 = this.formDataService.getStep1Info();
    this.step2 = this.formDataService.getStep2Info();
    this.step3 = this.formDataService.getStep3Info();
    this.formData = this.formDataService.getFormData();
  }

  save(form: any) {
    if (!form.valid) {
      return;
    }
    this.formDataService.setStep1Info(this.step1);
    this.formDataService.setStep2Info(this.step2);
    this.formDataService.setStep3Info(this.step3);

  }

}
