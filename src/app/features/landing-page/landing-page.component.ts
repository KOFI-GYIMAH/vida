import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@store/user';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  isAuthenticated$: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectIsAuthenticated).subscribe((isAuthenticated) => {
      this.isAuthenticated$ = isAuthenticated;
    });
  }
}
