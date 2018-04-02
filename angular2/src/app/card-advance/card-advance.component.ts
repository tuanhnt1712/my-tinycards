import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class PageModel {
  content: string;
}

@Component({
  selector: 'card-advance',
  templateUrl: './card-advance.component.html',
  styleUrls: ['./card-advance.component.css']
})
export class CardAdvanceComponent implements OnInit {
  page: PageModel;
  @Input('group') public cardForm: FormGroup;
  @Input() public i;
  picture: any;
  constructor() {
  }

  ngOnInit() {
    this.page = new PageModel();
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
