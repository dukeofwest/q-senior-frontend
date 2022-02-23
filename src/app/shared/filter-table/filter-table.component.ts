import { ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map, Observable } from 'rxjs';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent implements OnInit {
  @Output() onFilter = new EventEmitter<SecuritiesFilter>();
  @ViewChild('currencyInput') currencyInput: ElementRef<HTMLInputElement>;
  @ViewChild('typeInput') typeInput: ElementRef<HTMLInputElement>;
  @Input() displayName: boolean = true;
  @Input() displayTypes: boolean = true;
  @Input() displayCurrencies: boolean = true;
  @Input() displayPrivate: boolean = false;
  @Input() currencies: string[] = ['EUR', 'USD', 'GBP'];
  @Input() types: string[] = ['Equity', 'BankAccount', 'Generic', 'DirectHolding', 'RealEstate', 'Loan', 'Collectible', 'Closed-endFund'];
  
  separatorKeysCodes: number[] = [ENTER];
  selectedCurrencies: string[] = [];
  selectedTypes: string[] = [];
  filteredCurrency: Observable<string[]>;
  filteredType: Observable<string[]>;
  
  currenciesCtrl = new FormControl();
  typesCtrl = new FormControl(null);
  nameCtrl = new FormControl(null);
  isPrivateCtrl = new FormControl(true);

  constructor() {
    this.filteredCurrency = this.currenciesCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this.filterCurrency(fruit) : this.listCurrency()
      )
    );

    this.filteredType = this.typesCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this.filterType(fruit) : this.listType()
      )
    );
  }

  ngOnInit(): void {}

  filter() {
    this.onFilter.emit({
      name: this.nameCtrl.value ?? null,
      types: this.selectedTypes.length ? this.selectedTypes : null,
      currencies: this.selectedCurrencies.length ? this.selectedCurrencies : null,
      isPrivate: this.displayPrivate ? this.isPrivateCtrl.value : undefined
    });
  }

  addCurrency(event: MatChipInputEvent) {
    let currency = event.value.trim();
    if (
      currency &&
      this.currencies.includes(currency) &&
      !this.selectedCurrencies.includes(currency)
    ) {
      this.selectedCurrencies.push(currency);
    }
  }

  filterCurrency(value: string) {
    return this.currencies
      .filter((currency) =>
        currency.toLowerCase().includes(value.toLowerCase())
      )
      .filter((currency) => this.selectedCurrencies.indexOf(currency) == -1);
  }

  listCurrency() {
    return this.currencies.filter(
      (currency) => this.selectedCurrencies.indexOf(currency) == -1
    );
  }

  selectCurrency(event: MatAutocompleteSelectedEvent) {
    let currency = event.option.value;
    this.selectedCurrencies.push(currency);
    this.currencyInput.nativeElement.innerText = '';
    this.currenciesCtrl.setValue(null);
  }

  removeCurr(currency: string) {
    const index = this.selectedCurrencies.indexOf(currency);

    if (index >= 0) {
      this.selectedCurrencies.splice(index, 1);
    }
  }

  /**Start for Type */
  filterType(value: string) {
    return this.types
      .filter((type) =>
        type.toLowerCase().includes(value.toLowerCase())
      )
      .filter((type) => this.selectedTypes.indexOf(type) == -1);
  }

  listType() {
    return this.types.filter(
      (type) => this.selectedTypes.indexOf(type) == -1
    );
  }

  selectType(event: MatAutocompleteSelectedEvent) {
    let type = event.option.value;
    this.selectedTypes.push(type);
    this.typeInput.nativeElement.innerText = '';
    this.typesCtrl.setValue(null);
  }

  addType(event: MatChipInputEvent) {
    let type = event.value.trim();
    if (
      type &&
      this.types.includes(type) &&
      !this.selectedTypes.includes(type)
    ) {
      this.selectedTypes.push(type);
    }
  }
  removeType(type: string) {
    const index = this.selectedTypes.indexOf(type);

    if (index >= 0) {
      this.selectedTypes.splice(index, 1);
    }
  }
  /**End for Type */
}
