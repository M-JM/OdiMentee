import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.page.html',
  styleUrls: ['./studentlist.page.scss'],
})
export class StudentlistPage implements OnInit {

students = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.reloadstudents();
    this.logIt('OnIt');
  }

  reloadstudents() {
    this.profileService.getProfiles().subscribe(res => {
      this.students = res;
      console.log('profiles: ', res);
    });
  }

  logIt(msg: string) {
    console.log('msg');
  }
}
