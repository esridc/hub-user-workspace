import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-activity-stats',
  styleUrl: 'hub-activity-stats.css',
  shadow: true,
})
export class HubActivityStats {

  render() {
    return (
      <Host>
        <slot></slot>
        <arcgis-stat-card
          value-color=""
          card-title="Pageviews"
          title-tooltip="Every visit to this item's page."
          subtitle="Last 30 Days"
          value="1,042"
          text-align="end"
          trailing-text=""
          unit=""
          unit-position="after"
          corners="squared"
          shareable="true"
          shareable-by-value="false"
          shareable-on-hover="true"
        >
          <calcite-icon icon="arrow-bold-up" slot="value-media"></calcite-icon>
          <div slot="footer">
            <svg width="100%" viewBox="0 0 440 120" class="chart">
              <polyline
                fill="none"
                stroke="#0074d9"
                stroke-width="2"
                points="00,120 20,60 40,80 60,20 80,80 100,80 120,60 140,100 160,90 180,80 200, 110 220, 10 240, 70 260, 100 280, 100 300, 40 320, 0 340, 100 360, 100 380, 120 400, 60 420, 70 440, 80"
              />
            </svg>
          </div>
        </arcgis-stat-card> 
      </Host>
    );
  }

}
