import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from './filter-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    FilterTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports : [
    FilterTableComponent
  ],
  providers: [
    SecurityService
  ]
})
export class FilterTableModule { }
