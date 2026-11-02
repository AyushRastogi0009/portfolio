import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION } from '../data/portfolio.data';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly items = EDUCATION;
}