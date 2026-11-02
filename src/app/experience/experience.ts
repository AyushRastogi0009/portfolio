import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly job = EXPERIENCE;
}
