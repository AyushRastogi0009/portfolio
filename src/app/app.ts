import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { Achievements } from './achievements/achievements';
import { Contact } from './contact/contact';
import { Experience } from './experience/experience';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { Scene } from './scene/scene';
import { ScrollSpyService } from './services/scroll-spy';
import { SideNav } from './side-nav/side-nav';
import { Skills } from './skills/skills';
import { Education } from './education/education';
@Component({
  selector: 'app-root',
  imports: [Scene, SideNav, Hero, Experience, Projects, Skills,Education, Achievements, Contact, Education],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    const spy = inject(ScrollSpyService);
    // Start once every section has rendered, so their positions can be measured.
    afterNextRender(() => spy.start());
    inject(DestroyRef).onDestroy(() => spy.stop());
  }
}
