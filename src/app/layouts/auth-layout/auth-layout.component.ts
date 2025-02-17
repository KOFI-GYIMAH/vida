import { Component, type OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // * Get current path
    console.log(this.router.url);
  }
}
