import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NAV } from '../data/portfolio.data';
import { ScrollSpyService } from '../services/scroll-spy';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  protected readonly items = NAV;
  protected readonly spy = inject(ScrollSpyService);
}
