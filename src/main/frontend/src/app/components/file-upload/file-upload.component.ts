import {NgModule, Component, Input, Output, ElementRef, forwardRef, ViewChild} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Bounds, CropperSettings, ImageCropperComponent} from "ngx-img-cropper";
import {ImageCompress} from "ngx-image-compress";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
  name:string;
  data1:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor() {
    this.name = 'Angular2';
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 10;
    this.cropperSettings1.minHeight = 10;

    this.cropperSettings1.rounded = true;
    this.cropperSettings1.keepAspect = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.data1 = {};
  }

  cropped(bounds:Bounds) {
    this.croppedHeight = 200;
    this.croppedWidth = 200;
  }

  fileChangeListener($event) {
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  // selectedFileName: string = null;
  // @Input() showFileNameInput: boolean;
  // @Input() uploadButtonText: string;
  //
  // writeValue(value: any) {
  // }
  //
  // propagateChange = (_: any) => { };
  // registerOnChange(fn) {
  //   this.propagateChange = fn;
  // }
  // registerOnTouched() { }
  //
  // changeListener($event): void {
  //   this.readThis($event.target);
  // }
  // readThis(inputValue: any): void {
  //   let file: File = inputValue.files[0];
  //   let myReader: FileReader = new FileReader();
  //
  //   myReader.onloadend = (e) => {
  //     this.propagateChange(myReader.result);
  //     this.selectedFileName = file.name;
  //   };
  //   myReader.readAsDataURL(file);
  // }
}
