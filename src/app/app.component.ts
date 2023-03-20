import { Component } from '@angular/core';

import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'compress-image';

  imgResultBeforeCompress:DataUrl="";
  imgResultAfterCompress:DataUrl="";
  imgResultUpload:DataUrl="";

  constructor(private imgCompress:NgxImageCompressService){

  }

  compressFile(){
      return this.imgCompress.uploadFile().then(({image,orientation}:UploadResponse)=>{
        this.imgResultBeforeCompress = image;
        console.log(this.imgCompress.byteCount(this.imgResultBeforeCompress)/1024,' KB');

        this.imgCompress.compressFile(image,orientation,50,50).then((result:DataUrl)=>{
          this.imgResultAfterCompress = result;
          console.warn('Size of image after compression in KB',this.imgCompress.byteCount(this.imgResultAfterCompress)/1024);
        })
      })
  }

  // upload Image

  uploadFile(){
    return this.imgCompress.uploadFile().then(({image, orientation}:UploadResponse)=>{
      this.imgResultUpload = image;
    })
  }

}
