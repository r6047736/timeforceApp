import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfileUserNamePage } from './edit-profile-user-name';

@NgModule({
  declarations: [
    EditProfileUserNamePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfileUserNamePage),
  ],
})
export class EditProfileUserNamePageModule {}
