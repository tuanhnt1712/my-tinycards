import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare let tinymce: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TinyEditorComponent),
  multi: true
};

@Component({
  selector: 'app-tiny-editor',
  template: `<textarea #textArea [value]="value" id="back-card-value" class="form-control txt-back back" placeholder="Back"></textarea>`,
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy,  ControlValueAccessor {
  @Input() elementId: String;

  @ViewChild('textArea') textArea: ElementRef;

  editor: any;

  value: string;

  onChange = (_: any) => { };

  constructor(private zone: NgZone) {}

  writeValue(value: any): void {
    this.value = value;
    if (this.editor) {
      this.editor.setContent(value);
    }
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.textArea.nativeElement,
      plugins: ['link', 'paste', 'table'],
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.zone.run(() => this.onChange(content))
        });
      }
    });
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
