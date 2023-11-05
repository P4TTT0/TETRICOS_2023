import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss'],
})
export class UserInfoModalComponent  implements OnInit {
  @Input() user : any;

  constructor(private modalController : ModalController, private data : DataService) { }

  ngOnInit() {}

  public async onDecideClick(validated : boolean | null)
  {
    if(validated != null)
    {
      let userUID = await this.data.getUIDByUserName(this.user.UserName) || ''
      this.data.UpdateValidationUser(userUID, validated)
    }
    this.modalController.dismiss();
  }

}
