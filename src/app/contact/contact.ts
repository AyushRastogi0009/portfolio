import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CONTACT } from '../data/portfolio.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly contact = CONTACT;
  protected readonly mailto = `mailto:${CONTACT.email}?subject=Hello%20Ayush`;
  protected readonly copyRows = [
    { id: 'email', label: 'Email', value: CONTACT.email },
    { id: 'phone', label: 'Phone', value: CONTACT.phone },
  ];

  /** Button label per row while it shows "Copied" or "Selected". */
  private readonly labels = signal<Record<string, string>>({});

  protected labelFor(id: string): string {
    return this.labels()[id] ?? 'Copy';
  }

  protected async copy(id: string, text: string, element: HTMLElement): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.flash(id, 'Copied');
    } catch {
      // Clipboard blocked: select the text so the visitor can copy it by hand.
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.flash(id, 'Selected');
    }
  }

  private flash(id: string, label: string): void {
    this.labels.update((current) => ({ ...current, [id]: label }));
    setTimeout(() => {
      this.labels.update((current) => {
        const { [id]: _removed, ...rest } = current;
        return rest;
      });
    }, 2200);
  }
}
