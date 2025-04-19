import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-help-sidebar',
  templateUrl: './help-sidebar.component.html',
  styleUrls: ['./help-sidebar.component.css'],
  standalone: false
})
export class HelpSidebarComponent implements OnInit {
  isOpen = false;
  private readonly HELP_HIDDEN_KEY = 'helpHiddenUntil';

  ngOnInit() {
    const hiddenUntil = localStorage.getItem(this.HELP_HIDDEN_KEY);
    if (!hiddenUntil || new Date(hiddenUntil) < new Date()) {
      this.isOpen = true;
      localStorage.removeItem(this.HELP_HIDDEN_KEY);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      // Set expiration to 2 weeks from now
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
      localStorage.setItem(this.HELP_HIDDEN_KEY, twoWeeksFromNow.toISOString());
    }
  }
}
