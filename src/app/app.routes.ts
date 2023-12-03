import { Routes } from '@angular/router';
import { Day1Component } from './pages/day-1/day-1.component';

export const routes: Routes = [
    {
        path: 'day',
        children: [{
            path: '1',
            component: Day1Component,
            title: 'Day 1'
        }]
    }
    ];
