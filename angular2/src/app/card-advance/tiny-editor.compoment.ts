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
  template: `<textarea #textArea></textarea>`,
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy,  ControlValueAccessor {
  @Input() initialValue: string | undefined;

  @ViewChild('textArea') textArea: ElementRef;

  editor: any;

  onChange = (_: any) => { };

  constructor(private zone: NgZone) {}

  writeValue(value: any): void {
    this.initialValue = value || this.initialValue;
    if (this.editor && this.editor.initialized && typeof value === 'string') {
      this.editor.setContent(value);
    }
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.textArea.nativeElement,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code help wordcount'
      ],
      height: 300,
      menubar: false,
      toolbar: 'insert | undo redo | formatselect | bold italic text backcolor | bullist numlist | removeformat',
      setup: editor => {
        this.editor = editor;
        editor.on('init', () => {
          if (typeof this.initialValue !== 'undefined') {
            editor.setContent(this.initialValue);
          }
        });
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
