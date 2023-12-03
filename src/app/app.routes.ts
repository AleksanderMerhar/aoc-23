import { Routes } from '@angular/router';
import { Day1Component } from './pages/day-1/day-1.component';
import { Day12015Component } from './pages/day-1-2015/day-1-2015.component';

export const routes: Routes = [
    {
        path: 'day',
        children: [{
            path: '1',
            component: Day1Component,
            title: 'Day 1'
        }],
    },
    {
        path: '2015-day-1',
        component: Day12015Component,
        title: '2015 Day 1'
    }
];
