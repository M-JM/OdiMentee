/* eslint-disable @typescript-eslint/dot-notation */
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
  profile: any;
  userid: any;
  beschrijving: any;
  opleiding: any;
  taalvoorkeur: any;
  userImage: any;
  naam: any;
  private _entityId: any;

  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    // eslint-disable-next-line no-underscore-dangle
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._entityId = params.get('id');
      this.profileService.getProfile(this._entityId).subscribe(data => {
        this.beschrijving = data['beschrijving'];
        this.opleiding = data['opleiding'];
        this.taalvoorkeur = data['taalvoorkeur'];
        this.userImage = data['photo'];
        this.naam = data['naam'];
     });
    });
  }

}
