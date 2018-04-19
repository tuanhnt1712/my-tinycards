import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'card-advance',
  templateUrl: './card-advance.component.html',
  styleUrls: ['./card-advance.component.css']
})
export class CardAdvanceComponent implements OnInit {
  @Input('group') public cardForm: FormGroup;
  @Input() public i;
  picture: any;
  content: any;
  constructor() {
  }

  ngOnInit() {
    this.content = this.cardForm.value.back;
    this.picture = this.cardForm.value.picture['url'];
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
