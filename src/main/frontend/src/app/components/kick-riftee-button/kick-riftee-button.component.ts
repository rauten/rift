import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {UsersessionsComponent} from "../../usersessions/usersessions.component";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Userprofile} from "../../models/userprofile";

@Component({
  selector: 'app-kick-riftee-button',
  templateUrl: './kick-riftee-button.component.html',
  styleUrls: ['./kick-riftee-button.component.scss']
})
export class KickRifteeButtonComponent implements OnInit {
  @Input() riftee;
  @Input() sessionId;
  @Input() rifteeId;
  @Input() hostId;
  @Output() deleteRiftee = new EventEmitter<Userprofile>();
  modalRef: BsModalRef;

  constructor(private sessionService: UsersessionsService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  changeStatus(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  kickRiftee() {
    let data = {
      "accepted": 0,
      "hostId": this.hostId,
      "sessionId": parseInt(this.sessionId),
      "rifteeId": this.rifteeId
    };
    this.sessionService.updateSessionRequest(data);
    console.log("Kicked riftee from session");
    this.deleteRiftee.emit(this.riftee);
    this.modalRef.hide()
  }
}
