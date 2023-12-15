import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectedOption: string;

  constructor(private translateService: TranslateService) {
    this.selectedOption = 'English'; // Set 'Option 1' as the default selected option
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  getIconPath(option: string): string {
    switch (option) {
      case 'English':
        return '/assets/en.png'; // Path for Option 1 icon
      case 'French':
        return '/assets/fr.png'; // Path for Option 2 icon
      default:
        return '';
    }
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang); // Change the current language
  }
}
