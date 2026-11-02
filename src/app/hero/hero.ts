import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO_RESPONSE, HeroField, PROFILE } from '../data/portfolio.data';

interface JsonLine {
  key: string;
  value: string;
}

/** Formats a value the way it would appear in a JSON response. */
function toJson(value: HeroField['value']): string {
  if (Array.isArray(value)) return `[${value.map((v) => `"${v}"`).join(', ')}]`;
  return typeof value === 'number' ? String(value) : `"${value}"`;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly lines: JsonLine[] = HERO_RESPONSE.map((f) => ({
    key: f.key,
    value: toJson(f.value),
  }));
}
