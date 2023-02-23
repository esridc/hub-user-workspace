import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'hub-status',
  styleUrl: 'hub-status.css',
  shadow: true,
})
export class HubStatus {

  @Prop() statusUrl:string = 'https://arcgis.github.io/hub-status/status.json';

  statusTypes = {
    'normal': {icon: 'thumbs-up', color: 'green'},
    'degraded': {icon: 'exclamation-mark-circle', color: 'yellow'},
    'down': {icon: 'x-octagon-f', color: 'red'}
  }

  /**
   * 
  "overview": {
    "status": "normal",
    "message": "Hub sites operating normally."
  },
  "services": [
    {
      "Service Name": "Hub Sites",
      "Status": "normal"
    },
    {
      "Service Name": "Search API",
      "Status": "normal"
    },
    {
      "Service Name": "Content Indexer",
      "Status": "normal"
    },
    {
      "Service Name": "Downloads",
      "Status": "normal"
    },
    {
      "Service Name": "Discussions",
      "Status": "normal"
    }
  ],
   */
  @State() status:any = {};

  componentDidLoad() {
    this.fetchStatus()
  }

  async fetchStatus() {
    let data = await fetch(this.statusUrl);
    let statusData = await data.json();
    this.status = statusData;
  }

  render() {
    return (
      <Host>
        <calcite-list id="status">
          <calcite-list-item 
            label="Overall" 
            description={this.status?.overview?.status}
          >
          </calcite-list-item>
          
          {this.status?.services?.map((s) => {
            return (
              <calcite-list-item 
                label={s['Service Name']}
                description={this.status?.overview?.status}
              >
                <calcite-chip
                  icon={this.statusTypes[s['Status']].icon}
                  slot="content-end"
                >
                  {s['Status']}
                </calcite-chip>
              </calcite-list-item>
            )
          })}
          
        </calcite-list>
      </Host>
    );
  }

}
