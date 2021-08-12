import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.page.html',
  styleUrls: ['./studentlist.page.scss'],
})
export class StudentlistPage implements OnInit {

students = [];
loadedStudentsList= [];
term = '';
showSpinner = true;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.reloadstudents();
  }

  // TODO: Search functionality out of the box pipe -> make own pipe to filter based on select object properties of my array
  //  https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value
  //  https://medium.com/swlh/filtering-an-array-of-nested-arrays-and-objects-using-angular-pipes-611af3b356f0



  /* filterList($event){
    this.initializeStudentList();
    const searchTerm = $event.srcElement.value;
    if(!searchTerm) {
      return;
    }
    this.students = this.loadedStudentsList.filter(result => {
      if(result.naam && searchTerm){
        if(result.naam.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    }); */

    // this.students = this.loadedStudentsList.filter( students => {
    //   Object.keys(students).some(k => students[k].toLowerCase().includes(searchTerm.toLowerCase()));
    // });
  // };

  reloadstudents() {
    this.profileService.getProfiles().subscribe(res => {
      this.students = res;
      this.loadedStudentsList=res;
      this.showSpinner=false;
    });
  }

  initializeStudentList(): void {
    this.students = this.loadedStudentsList;
  }

}
