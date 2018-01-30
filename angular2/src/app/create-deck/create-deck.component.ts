import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { DecksService } from '../decks.service';
import { Deck } from '../deck';

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
            user_id: 1,
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            cards_attributes: this._fb.array([])
        });

        // add address
        this.addCard();
    }

  initCard() {
      // initialize our address
      return this._fb.group({
          front: ['', Validators.required],
          back: ['']
      });
  }

  addCard() {
      // add address to the list
      const control = <FormArray>this.myForm.controls['cards_attributes'];
        const addrCtrl = this.initCard();

        control.push(addrCtrl);
  }

  removeCard(i: number) {
      // remove address from the list
      const control = <FormArray>this.myForm.controls['cards_attributes'];
      control.removeAt(i);
  }


  save(model: Deck) {
    // call API to save customer
    console.log(model);
    // let deck = {user_id: 1, title: title, description: description};
    this.decksService.add_deck(model["value"]).subscribe(
       data => {
         return true;
       }
    );
  }

  // createDeck(title, description) {
  //   let deck = {user_id: 1, title: title, description: description};
  //   debugger
  //   this.decksService.add_deck(deck).subscribe(
  //      data => {
  //        return true;
  //      }
  //   );
  // }
}
