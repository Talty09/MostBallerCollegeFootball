import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EspnService } from './espn.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <!-- Header -->
    <mat-toolbar color="primary">
      <mat-icon>sports_football</mat-icon>
      <span style="margin-left: 10px;">College Football Scoreboard - 2025</span>
      
      <!-- Week Selector -->
      <span style="flex: 1;"></span>
      <mat-form-field appearance="outline" style="width: 120px; margin-right: 20px;">
        <mat-label>Week</mat-label>
        <mat-select [value]="selectedWeek" (selectionChange)="onWeekChange($event.value)">
          <mat-option *ngFor="let week of weeks" [value]="week">
            Week {{ week }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-toolbar>

    <!-- Main Content -->
    <div style="padding: 20px; background-color: #f5f5f5; min-height: calc(100vh - 64px);">
      
      <!-- Loading -->
      <div *ngIf="loading" style="text-align: center; padding: 50px;">
        <mat-spinner diameter="60"></mat-spinner>
        <p style="margin-top: 20px; color: #666;">Loading games...</p>
      </div>

      <!-- Error -->
      <mat-card *ngIf="error && !loading" style="max-width: 500px; margin: 20px auto; text-align: center;">
        <div style="padding: 20px;">
          <mat-icon color="warn" style="font-size: 48px; width: 48px; height: 48px;">error</mat-icon>
          <p style="margin: 20px 0;">{{ error }}</p>
          <button mat-raised-button color="primary" (click)="loadScoreboard()">
            <mat-icon>refresh</mat-icon>
            Try Again
          </button>
        </div>
      </mat-card>

      <!-- Games -->
      <div *ngIf="scoreboard && !loading && !error">
        <h2 style="text-align: center; margin-bottom: 30px;">Week {{ selectedWeek }} Games ({{ scoreboard.events?.length || 0 }} games)</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;">
          <mat-card *ngFor="let event of scoreboard.events" style="cursor: pointer;" (click)="showGameDetails(event)">
            
            <!-- Game Header -->
            <div style="padding: 15px; background-color: #f8f9fa; border-bottom: 1px solid #dee2e6;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 500;">{{ getGameDate(event) | date:'EEEE, MMM d' }}</div>
                  <div style="font-size: 0.9rem; color: #666;">{{ getGameDate(event) | date:'h:mm a' }}</div>
                </div>
                <div style="background-color: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                  {{ getGameStatus(event) }}
                </div>
              </div>
            </div>

            <!-- Teams -->
            <div style="padding: 20px;">
              <div *ngFor="let competitor of event.competitions[0]?.competitors" 
                   style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                
                <div style="flex: 1;">
                  <div style="font-size: 1.1rem; font-weight: 500;">{{ competitor.team.displayName }}</div>
                  <div style="font-size: 0.85rem; color: #666;" *ngIf="competitor.records">
                    {{ competitor.records[0]?.summary }}
                  </div>
                </div>
                
                <div style="font-size: 1.8rem; font-weight: 600; color: #007bff; min-width: 50px; text-align: right;"
                     [style.color]="competitor.winner ? '#28a745' : '#007bff'"
                     [style.font-weight]="competitor.winner ? '700' : '600'">
                  {{ competitor.score }}
                </div>
              </div>

              <!-- Venue -->
              <div *ngIf="event.competitions[0]?.venue" style="margin-top: 15px; font-size: 0.9rem; color: #666; display: flex; align-items: center;">
                <mat-icon style="margin-right: 5px; font-size: 16px;">place</mat-icon>
                {{ event.competitions[0].venue.fullName }}
              </div>
            </div>
          </mat-card>
        </div>
      </div>

      <!-- No Games -->
      <mat-card *ngIf="scoreboard && scoreboard.events?.length === 0 && !loading" style="max-width: 500px; margin: 20px auto; text-align: center;">
        <div style="padding: 40px;">
          <mat-icon style="font-size: 64px; width: 64px; height: 64px; color: #ccc;">sports_football</mat-icon>
          <h3>No games found</h3>
          <p>No games scheduled for Week {{ selectedWeek }}.</p>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
    
    mat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
  `]
})
export class App implements OnInit {
  scoreboard: any = null;
  loading = false;
  error: string | null = null;
  weeks = Array.from({length: 17}, (_, i) => i + 1);
  selectedWeek = 3;
  year = 2025;

  constructor(private espnService: EspnService) {}

  ngOnInit() {
    this.loadScoreboard();
  }

  loadScoreboard() {
    this.loading = true;
    this.error = null;
    this.scoreboard = null;
    
    this.espnService.getScoreboard(this.selectedWeek, this.year).subscribe({
      next: (data) => {
        this.scoreboard = data;
        this.loading = false;
        console.log(`Loaded ${data.events?.length || 0} games for week ${this.selectedWeek}`);
      },
      error: (err) => {
        console.error('Error loading scoreboard:', err);
        this.error = 'Failed to load games. Please try again.';
        this.loading = false;
      }
    });
  }

  onWeekChange(week: number) {
    this.selectedWeek = week;
    this.loadScoreboard();
  }

  getGameStatus(event: any): string {
    return event.status?.type?.description || 'Final';
  }

  getGameDate(event: any): Date {
    return new Date(event.date);
  }

  showGameDetails(event: any) {
    console.log('Game details:', event);
  }
}
