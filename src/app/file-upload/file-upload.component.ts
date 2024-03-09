import { Component } from '@angular/core';
import { DriveAPIsService } from '../services/drive-apis.service';
import { map } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FileUploadComponent {
  fileToUpload?: FileList;
  resumableUrl:string = "";

  fileName ="";
  size: number | undefined;
  mimeType ="";

  constructor(private driveApis: DriveAPIsService){

  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files;
    let fileDetails = this.fileToUpload?.item(0)!;
    this.fileName = fileDetails?.name!;
    this.size = fileDetails?.size!;
    this.mimeType = fileDetails?.type!;
    console.log(this.fileToUpload?.item(0));

    this.driveApis.getResumableURL(this.fileName, this.mimeType, "498a").pipe(map(data => {
      console.log(data.headers.get('location'));
      this.resumableUrl = data.headers.get('location');
    })).subscribe({
      next(response) {
        console.log('PreResumable URL');
      },
      error(err) {
        console.log('PreResumable url error :' + err);
      },
      complete() {
        console.log('PreResumable Url generated');
      }
    })

  }

  public uploadFile(): void {
    this.driveApis.uploadFile(this.resumableUrl, this.fileToUpload?.item(0)!).pipe(map(data => {
      return data;
    })).subscribe({
      next(response) {
        console.log('Upload Response');
      },
      error(err) {
        console.log('Upload url error :' + JSON.stringify(err));
      },
      complete() {
        console.log('Upload completed');
      }
    })
  }
}
