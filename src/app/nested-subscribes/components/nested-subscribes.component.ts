import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { startWith, takeUntil } from "rxjs/operators";

@Component({
  templateUrl: './nested-subscribes.component.html'
})
export class NestedSubscribesComponent implements OnInit, OnDestroy {

  topFiveForm: FormGroup;
  positions = [
   'Point Guard',
   'Shooting Guard',
   'Small Forward',
   'Power Guard',
   'Center'
  ];
  filteredPositions: string[];;
  
  private _componentDestroyed$ = new Subject();

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.topFiveForm = this._fb.group({
      position: [null]
    });
    this.topFiveForm.get('position').valueChanges
      .pipe(
        takeUntil(this._componentDestroyed$)
      )
      .subscribe(value => {
        console.log('VALUE', value);
        if (!!value) {
          this.filteredPositions = this.positions.filter(position => position.toLowerCase().indexOf(value.toLowerCase()) > -1);
        } else {
          this.filteredPositions = this.positions;
        }
      })

  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
  }

}