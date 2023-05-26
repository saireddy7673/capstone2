import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css'],
})
export class CsvComponent implements OnInit {
  form: FormGroup;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      csv: ['', Validators.required],
      fileSource: ['', [Validators.required]],
    });
  }

  onFileUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });
    }
  }

  save() {
    const formData = new FormData();
    formData.append('file', this.form.get('fileSource').value);

    this.productService.uploadCsv(formData).subscribe((res) => {
      alert('Uploaded Successfully.');
    });
  }
}
