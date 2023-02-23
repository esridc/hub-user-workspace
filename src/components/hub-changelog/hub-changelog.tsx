import { Component, Host, State, h } from '@stencil/core';
import { timeAgo } from '../../utils/time';

@Component({
  tag: 'hub-changelog',
  styleUrl: 'hub-changelog.css',
  shadow: true,
})
export class HubChangelog {

  @State() releases:Array<any> = [];

  changeTypes = {
    'add': {icon: 'plus'},
    'change': {icon: 'fork-right'},
    'fix': {icon: 'debug'}
  }
  componentWillLoad() {
    this.getChangelog();
  }

  /**
   * {
    "releases": [
        {
            "timestamp": "2023-02-22T00:00:00Z",
            "changes": [
                {"type": "add", "description": "Added active state border around map when adding location to posts in Hub Discussions"},
                {"type": "add", "description": "Added Advanced Mapping links that allow users to select ArcGIS MapViewer Classic"},
                {"type": "change", "description": "Changed theme color mapping for buttons"},
                {"type": "fix", "description": "The Mentions list is now themed"},
                {"type": "fix", "description": "The on-map controls and widgets now have matching shadows"},
                {"type": "fix", "description": "Fixed intermittent New content button alignment issue"}
            ]
        }
      ]}
   */
  async getChangelog() {
    const data = await fetch('./data/changelog.json');
    const changelog = await data.json();
    this.releases = changelog.releases;
  } 

  private formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})     
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-accordion scale="m" appearance="solid" selection-mode="multiple">

        {this.releases.map((release) => {
          return (
            <calcite-accordion-item
              heading={this.formatDate(release.timestamp)}
              description={`${release.changes.length} changes ${timeAgo(release.timestamp)}`}
              icon-start=""
              icon-end=""
            >
              <calcite-list id="changes">
              {release.changes.map((change) => {
                return (
                  <calcite-list-item description={change.description}>
                    <calcite-chip
                      class="list-chip"
                      icon={this.changeTypes[change.type].icon}
                      scale="s"
                      appearance="solid"
                      kind="neutral"
                      slot="content-start"
                    >
                      {change.type}
                    </calcite-chip>
                  </calcite-list-item>
                )
              })}
              </calcite-list>
            </calcite-accordion-item>
          )

        })}
        </calcite-accordion>
      </Host>
    );
  }

}
