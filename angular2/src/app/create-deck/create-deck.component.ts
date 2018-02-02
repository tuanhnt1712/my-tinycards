import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit{
  public myForm: FormGroup;

  constructor(private decksService: DecksService,
              private _fb: FormBuilder,
              private router: Router
  ) {}

  ngOnInit(){
    this.myForm = this._fb.group({
              title: ['', [Validators.required]],
              description: ['', [Validators.required]],
              cards_attributes: this._fb.array([])
    });
    this.addCard();
  }

  initCard() {
    return this._fb.group({
        front: ['', Validators.required],
        back: ['', Validators.required]
    });
  }

  addCard() {
    const control = <FormArray>this.myForm.controls['cards_attributes'];
    const addrCtrl = this.initCard();

    control.push(addrCtrl);
  }

  removeCard(i: number) {
    const control = <FormArray>this.myForm.controls['cards_attributes'];
    control.removeAt(i);
  }


  save(model: Deck) {
    this.decksService.add_deck(model["value"]).subscribe(
      data => {
        return true;
      });
    this.router.navigate(['/decks']);
  }
}
