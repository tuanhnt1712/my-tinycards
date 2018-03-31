import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
      <h3 mat-dialog-title>{{ title }}</h3>
      <mat-dialog-content>{{ message }}</mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-raised-button [mat-dialog-close]="true">Yes</button>
        <button mat-button mat-raised-button mat-dialog-close>No</button>
      </mat-dialog-actions>
    `,
})

export class DialogComponent {
  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {

  }
}
