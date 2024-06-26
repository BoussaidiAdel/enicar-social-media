import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Field } from 'src/app/Models/Field';
import { User } from 'src/app/Models/User';
import { FieldService } from 'src/app/Services/field.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  id: any;
  user! : User;
  fields : Field[] = [];

  newuser! : any;


  constructor(private route: ActivatedRoute , private userService : UserService , private fieldService : FieldService,  private toast : NgToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.userService.getUser(this.id).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });

    this.fieldService.getAllFields().subscribe((res: any) => {
      this.fields = res;
    });

    console.log(this.user);


  }

  

  updateUser(){
    const user = new FormData();
    user.append('firstName' , this.user.firstName);
    user.append('lastName' , this.user.lastName);
    user.append('birthDate' , this.user.birthDate.toString());
    user.append('verified' , this.user.verified.toString());
    user.append('profilePicture' , this.user.profilePicture);
    user.append('coverPicture' , this.user.coverPicture);
    user.append('aboutMe' , this.user.aboutMe);








    this.userService.updateUser(this.id , user).subscribe((res: any) => {
      this.toast.success({detail : 'Success' , summary: 'User Updated' , duration: 2000});
    });
  }




}
