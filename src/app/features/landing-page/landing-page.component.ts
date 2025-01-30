import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services/local-storage.service';
import { loadUserRecordSuccess, selectIsAuthenticated } from '@store/user';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CommonModule, AnimateOnScrollModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  isAuthenticated$: boolean = false;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getItem('user');
    if (user) {
      this.store.dispatch(loadUserRecordSuccess({ user }));
    }

    this.store.select(selectIsAuthenticated).subscribe((isAuthenticated) => {
      this.isAuthenticated$ = isAuthenticated;
    });
  }

  scrollPosition: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY;
  }

  stats = [
    { label: 'Scans Analyzed', value: '10,000+' },
    { label: 'Accuracy Rate', value: '99.8%' },
    { label: 'Medical Centers', value: '500+' },
    { label: 'Countries Served', value: '50+' },
  ];

  features = [
    {
      icon: 'pi pi-eye',
      title: 'Real-Time Analysis',
      description:
        'Get instant results with our advanced AI processing capabilities.',
    },
    {
      icon: 'pi pi-wave-pulse',
      title: 'Precise Detection',
      description:
        'Identify potential issues with industry-leading accuracy rates.',
    },
    {
      icon: 'pi pi-shield',
      title: 'Secure Platform',
      description: 'HIPAA-compliant security for your sensitive medical data.',
    },
  ];

  getBackgroundOpacity(): string {
    const opacity = this.scrollPosition / 500;
    return `rgba(15, 23, 42, ${opacity > 0.9 ? 0.9 : opacity})`;
  }

  getBlurEffect(): string {
    const blurValue = this.scrollPosition / 50;
    return `blur(${blurValue > 10 ? 10 : blurValue}px)`;
  }
}
