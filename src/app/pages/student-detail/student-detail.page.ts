/* eslint-disable no-underscore-dangle */
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
  private _entityId: any;

  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._entityId = params.get('id');
      this.profileService.getProfile(this._entityId).subscribe(res => {
        console.log(res);
      });
    });
  }

}
