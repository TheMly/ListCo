import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InformationDialogComponent} from '../dialog/information/information-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialog: MatDialog) { }

  handleError(error: HttpErrorResponse): void {

    let errorMessage: string;

    switch (error.status) {
      case(404): {
        errorMessage = 'The list you want to open doesn\'t exist. Confirm you inserted the correct list ID.';
        break;
      }
      default: {
        return;
      }
    }

    this.dialog.open(InformationDialogComponent, {
      width: '350px',
      data: {errorMessageProp: errorMessage}
    });
  }
}

