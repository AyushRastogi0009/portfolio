import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILLS } from '../data/portfolio.data';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILLS;
}
