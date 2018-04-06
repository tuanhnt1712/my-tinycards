import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
declare var $: any;

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

  ngAfterViewInit() {
    $('#front-card-value').on('keypress', function(e) {
      var front = $(this);
      var frontLength = front.val().length;

      if (frontLength > 80) {
        front.css('font-size', '12px');
      } else if(frontLength > 60) {
        front.css('font-size', '16px');
      } else if(frontLength > 35) {
        front.css('font-size', '20px');
      }
    });

    $('#back-card-value').on('keypress', function(e) {
      var back = $(this);
      var backLength = back.val().length;

      if (backLength > 150) {
        back.css('font-size', '16px');
      } else if(backLength > 100) {
        back.css('font-size', '20px');
      } else if(backLength > 60) {
        back.css('font-size', '22px');
      }
    });
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
