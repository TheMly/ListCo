import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'listco-edit-list-title-dialog',
  templateUrl: 'edit-list-title-dialog.component.html',
  styleUrls: ['./edit-list-title-dialog.component.css']
})
export class EditListTitleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditListTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newListTitle: string) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

