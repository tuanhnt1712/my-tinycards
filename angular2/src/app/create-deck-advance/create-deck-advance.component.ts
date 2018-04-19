import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { AlertService } from '../services/alert.service';
import { Deck } from '../deck';

@Component({
  selector: 'app-create-deck-advance',
  templateUrl: './create-deck-advance.component.html',
  styleUrls: ['./create-deck-advance.component.css']
})
export class CreateDeckAdvanceComponent implements OnInit{
  public myForm: FormGroup;
  imageUrl: any;

  constructor(private decksService: DecksService,
              private _fb: FormBuilder,
              private router: Router,
              private alertService: AlertService
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
        picture: [''],
        content: ['']
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
    model["value"].is_advance = true;
    this.decksService.add_deck(model["value"]).subscribe(
      data => {
        this.router.navigate(['/decks', data.data.id]);
        this.alertService.success("Create deck successfuly");
      },
      error => {
        JSON.parse(error._body).errors.forEach(body => {
          this.alertService.error(body.field + " " + body.message);
        })
      });
  }

  onFileChange(event) {
    document.getElementById('blah').style.display = "block";
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        (<HTMLInputElement>document.getElementById('blah')).setAttribute('src', reader.result);
        (<HTMLInputElement>document.getElementById('closeModalButton')).click();
        (<HTMLInputElement>document.getElementById('preview-img')).style.top = '0%';
        this.myForm.get('cover_image').setValue("data:"+file.type +";base64, " + reader.result.split(',')[1])
      };
    }
  }
}
