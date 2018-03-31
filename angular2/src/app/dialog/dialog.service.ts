import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from './dialog.component';
import 'rxjs/add/observable/of';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) { }

  public confirm({title='confirm', message}): Observable<boolean> {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
}
