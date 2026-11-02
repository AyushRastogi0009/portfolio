import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ACHIEVEMENTS, ALSO_PARTICIPATED } from '../data/portfolio.data';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Achievements {
  protected readonly items = ACHIEVEMENTS;
  protected readonly also = ALSO_PARTICIPATED;
}
