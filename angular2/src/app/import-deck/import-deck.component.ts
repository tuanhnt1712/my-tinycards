import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { AlertService } from '../services/alert.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-import-deck',
  templateUrl: './import-deck.component.html',
  styleUrls: ['./import-deck.component.css']
})
export class ImportDeckComponent implements OnInit{
  public myForm: FormGroup;
  loading = false;
  @ViewChild('coverImgModal') coverImgModal: any

  constructor(private decksService: DecksService,
              private _fb: FormBuilder,
              private router: Router,
              private alertService: AlertService
  ) {}

  ngOnInit(){
    this.loading = false;
    this.myForm = this._fb.group({file_url: ['', [Validators.required]]});
  }

  save(model: Deck) {
    this.loading = true;
    this.decksService.import_deck(model["value"]).subscribe(
    data => {
      this.loading = false;
      this.coverImgModal.close();
      this.router.navigate(['/decks']);
    },
    error => {
      JSON.parse(error._body).errors.forEach(body => {
        this.alertService.error(body.field + " " + body.message);
      })
    })
  }
}
