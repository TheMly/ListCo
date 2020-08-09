import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'listco-open-list-dialog',
  templateUrl: 'open-list-dialog.component.html',
  styleUrls: ['./open-list-dialog.component.css']
})
export class OpenListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public listIdToOpen: number) {}

  onCloseClick(): void {
     this.dialogRef.close();
  }

}

