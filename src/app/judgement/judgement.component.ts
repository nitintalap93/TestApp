import { Component } from '@angular/core';
import { DriveAPIsService } from '../services/drive-apis.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-judgement',
  templateUrl: './judgement.component.html',
  styleUrl: './judgement.component.css',
  standalone:true,
  imports: [CommonModule]
})
export class JudgementComponent {
  fileList = [];
  selectedSection: string = "";

  constructor(private driveApis: DriveAPIsService){
    
  }

  public getFileList(event: any) : void{

    this.selectedSection = event.target.value;

    if(this.selectedSection == "Select Section" || this.selectedSection == ""){
      alert("Please select section to fetch judgements.");
      return;
    }

    this.driveApis.getFileList(this.selectedSection).pipe(map(data => {
      console.log(data["files"]);
      this.fileList = data["files"];
    })).subscribe({
      next(response) {
        console.log('response received');
        console.log(response);
      },
      error(err) {
        console.log('error' + JSON.stringify(err));
      },
      complete() {
        console.log('request completed');
      }
    });
  }

  // public downloadFile(fileElem:any) : void {
  //   let fileId = fileElem.attributes['fileId'].value;
  //   console.log('$$$$$$$$$$$$$$$$$$_______ FileID _________$$$$$$$$$$$$$$$$$');
  //   console.log(fileId);
  //   this.driveApis.downloadFile(fileId).subscribe({
  //     next(response) {
  //       console.log('download donw');
  //       console.log(response);
  //     },
  //     error(err) {
  //       console.log('download error' + JSON.stringify(err));
  //     },
  //     complete() {
  //       console.log('download completed');
  //     }
  //   });
  // }
}
