import { Routes } from '@angular/router';
import { Day1Component } from './pages/day-1/day-1.component';
import { Day12015Component } from './pages/day-1-2015/day-1-2015.component';
import { Day2Component } from './pages/day-2/day-2.component';
import { Day3Component } from './pages/day-3/day-3.component';
import { Day4Component } from './pages/day-4/day-4.component';
import { Day5Component } from './pages/day-5/day-5.component';
import { Day6Component } from './pages/day-6/day-6.component';
import { Day7Component } from './pages/day-7/day-7.component';
import { Day8Component } from './pages/day-8/day-8.component';
import { Day9Component } from './pages/day-9/day-9.component';
import { Day10Component } from './pages/day-10/day-10.component';


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
        },
        {
            path: '5',
            component: Day5Component,
            title: 'Day 5'
        },
        { 
            path: '6',
            component: Day6Component,
            title: 'Day 6'
        },
        { 
            path: '7',
            component: Day7Component,
            title: 'Day 7'
        },
        {
            path: '8',
            component: Day8Component,
            title: 'Day 8'
        },
        {
            path: '9',
            component: Day9Component,
            title: 'Day 9'
        },
        {
            path: '10',
            component: Day10Component,
            title: 'Day 10'
        }
    ]},
    {
        path: '2015-day-1',
        component: Day12015Component,
        title: '2015 Day 1'
    }
];
