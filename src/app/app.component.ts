import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'metadesign';

  constructor(public modalService: BsModalService) {}
  modalRef:BsModalRef;
  ngOnInit() {
  }
  public openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  detailsObj = {
    dateOfBirth:moment().format('DD-MMM-YYYY'),
    nikName:null,
    fullName:null
  }

/////////////////////////   DATE FORMAT ///////////////////////////////////////////
monthName = ["","Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
dateToConvert;
issueDateChange = () => {
 this.dateToConvert = $(".issueDatePick").val();
 this.detailsObj.dateOfBirth = this.changeDateFormate(this.dateToConvert);
 $(".issueDatePick").val(this.detailsObj.dateOfBirth);
};

changeDateFormate(val) {
 let val2 = String(val).split("/");
 let newDate = val2[1] + "-" + this.monthName[val2[0]] + "-" + val2[2];
 return newDate;
}

detailsArr = [];

add = () =>{
 let val = String(this.dateToConvert).split("/");
 let monthName = ["","Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
 this.detailsObj.dateOfBirth = monthName[val[0]] + " " + val[1] + "," +  val[2];

 this.detailsArr.push(JSON.parse(JSON.stringify(this.detailsObj)))
 this.detailsObj.fullName = null;
 this.detailsObj.nikName = null;
 this.modalService.hide();
}

delete = (index) => {
this.detailsArr.splice(index,1);
}


markAsDone = (_index) => {
  $(`.isShow${_index}`).show();
}

public closeModal() {
   this.modalService.hide();
}

}
