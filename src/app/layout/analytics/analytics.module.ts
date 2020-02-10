import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, AnalyticsRoutingModule, PageHeaderModule, NgbModule, ReactiveFormsModule],
    declarations: [AnalyticsComponent]
})
export class AnalyticsModule {}
