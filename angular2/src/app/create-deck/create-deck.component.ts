import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DecksService } from '../decks.service';
import { Deck } from '../deck';
import { Card } from '../card';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent implements OnInit{
  deck: Deck;
  public myForm: FormGroup;

  constructor(private decksService: DecksService,
              private _fb: FormBuilder
  ) { }

  ngOnInit(){
    this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            addresses: this._fb.array([
                this.initCard(),
            ])
        });
    }

  initCard() {
      // initialize our address
      return this._fb.group({
          street: ['', Validators.required],
          postcode: ['']
      });
  }

  addCard() {
      // add address to the list
      const control = <FormArray>this.myForm.controls['addresses'];
      control.push(this.initCard());
  }

  removeCard(i: number) {
      // remove address from the list
      const control = <FormArray>this.myForm.controls['addresses'];
      control.removeAt(i);
  }
 

  save(model: Deck) {
    // call API to save customer
    console.log(model);
  }

  createDeck(title, description) {
    let deck = {user_id: 1, title: title, description: description};
    debugger
    this.decksService.add_deck(deck).subscribe(
       data => {
         return true;
       }
    );
  }
}
