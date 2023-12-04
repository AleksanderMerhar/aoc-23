import { Routes } from '@angular/router';
import { Day1Component } from './pages/day-1/day-1.component';
import { Day12015Component } from './pages/day-1-2015/day-1-2015.component';
import { Day2Component } from './pages/day-2/day-2.component';
import { Day3Component } from './pages/day-3/day-3.component';
import { Day4Component } from './pages/day-4/day-4.component';

export const routes: Routes = [
    {
        path: 'day',
        children: [{
            path: '1',
            component: Day1Component,
            title: 'Day 1'
        },
        {
            path: '2',
            component: Day2Component,
            title: 'Day 2'
        },
        {
            path: '3',
            component: Day3Component,
            title: 'Day 3'
        },
        {
            path: '4',
            component: Day4Component,
            title: 'Day 4'
        }],
    },
    {
        path: '2015-day-1',
        component: Day12015Component,
        title: '2015 Day 1'
    }
];
