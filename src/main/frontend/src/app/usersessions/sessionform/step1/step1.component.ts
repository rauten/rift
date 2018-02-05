import { Component, OnInit } from '@angular/core';
import { Step1 } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  title = 'Step 1';
  step1: Step1;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.step1 = this.formDataService.getStep1Info();
    console.log("Step 1 information loaded");
  }

  save(form: any) {
    if (!form.valid) {
      return;
    }
    this.formDataService.setStep1Info(this.step1);
  }

}
