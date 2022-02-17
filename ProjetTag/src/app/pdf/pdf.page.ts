import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {
  pdf;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(`${this.pdf}`);
    this.downloadViewImage(`${this.pdf}`);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  downloadViewImage(url){
    window.open(encodeURI(url),"_system","location=yes");
}

}
