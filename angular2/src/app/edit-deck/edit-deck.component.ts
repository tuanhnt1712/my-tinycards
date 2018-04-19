import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { AlertService } from '../services/alert.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-create-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit{
  public myForm: FormGroup;
  deck: Deck;
  sub: any;
  imageUrl: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private decksService: DecksService,
              private _fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService
  ) {}

  ngOnInit(){
    this.myForm = this._fb.group({
                    id: ['', [Validators.required]],
                    title: ['', [Validators.required]],
                    description: ['', [Validators.required]],
                    cover_image: [''],
                    cards_attributes: this._fb.array([])
          });
    const self = this;
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.decksService
        .get(id)
        .subscribe(p => {
          this.deck = p;
          this.myForm = this._fb.group({
                    id: [this.deck.id, [Validators.required]],
                    title: [this.deck.title, [Validators.required]],
                    description: [this.deck.description, [Validators.required]],
                    cover_image: [''],
                    cards_attributes: this._fb.array(this.build_array(this.deck.cards))
          });
          console.log(this.deck);
        }
      )
    });
  }

  build_array(cards){
    return cards.map(card => {
      return this.initCard(card)
    })
  }

  initCard(card) {
    return this._fb.group({
        id: [card.id, Validators.required],
        _destroy: [''],
        front: [card.front, Validators.required],
        back: [card.back, Validators.required],
        picture: [card.picture]
    });
  }

  addCard() {
    const control = <FormArray>this.myForm.controls['cards_attributes'];
    const addrCtrl = this.initCard({id: '', front: '', back: '', picture: ''});

    control.push(addrCtrl);
  }

  removeCard(i: number) {
    const control = <FormArray>this.myForm.controls['cards_attributes'];
    var current = <FormGroup>control.at(i)
    current.controls['_destroy'].setValue(true)
  }


  save(model: Deck) {
    this.decksService.update_deck(model["value"]).subscribe(
      data => {
        this.router.navigate(['/decks', model["value"]['id']]);
        this.alertService.success("Edit deck successfuly");
      },
      error => {
        JSON.parse(error._body).errors.forEach(body => {
          this.alertService.error(body.field + " " + body.message);
        })
      });
  }

  onFileChange(event) {
    var self = this
    document.getElementById('blah').style.display = "block";
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        (<HTMLInputElement>document.getElementById('blah')).setAttribute('src', reader.result);
        (<HTMLInputElement>document.getElementById('closeModalButton')).click();
        (<HTMLInputElement>document.getElementById('preview-img')).style.top = '0%';
        self.myForm.controls['cover_image'].setValue(reader.result)
      };
    }
  }

  deleteDeck(deck) {
    this.decksService.deleteDeck(deck.id).subscribe(
      data => {
        this.router.navigate(['/decks']);
      }
    )
  }
}
