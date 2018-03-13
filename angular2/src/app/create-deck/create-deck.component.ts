import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  imageUrl: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private decksService: DecksService,
              private _fb: FormBuilder,
              private router: Router
  ) {}

  ngOnInit(){
    this.myForm = this._fb.group({
              title: ['', [Validators.required]],
              description: ['', [Validators.required]],
              cover_image: [''],
              cards_attributes: this._fb.array([])
    });
    this.addCard();
  }

  initCard() {
    return this._fb.group({
        front: ['', Validators.required],
        back: ['', Validators.required],
        picture: ['']
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
        this.router.navigate(['/decks']);
        return true;
      });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        (<HTMLInputElement>document.getElementById('blah')).setAttribute('src', reader.result);
        (<HTMLInputElement>document.getElementById('closeModalButton')).click();
        this.myForm.get('cover_image').setValue("data:"+file.type +";base64, " + reader.result.split(',')[1])
      };
    }
  }
}
