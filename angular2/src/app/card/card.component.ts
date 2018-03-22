import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('group') public cardForm: FormGroup;
  @Input() public i;
  picture: any;
  constructor() {
  }

  ngOnInit() {
    this.picture = this.cardForm.value.picture['url']
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture = reader.result;
        this.cardForm.controls['picture'].setValue(reader.result);
	 	  }
  	}
	}
}
