import { IHubCollection, IHubSearchOptions, IQuery, hubSearch } from '@esri/hub-common';
import { Component, Host, Prop, State, h } from '@stencil/core';
import { timeAgo } from '../../utils/time';
import state from '../../utils/state';
// import { UserSession } from '@esri/arcgis-rest-auth';

@Component({
  tag: 'hub-feed',
  styleUrl: 'hub-feed.css',
  shadow: true,
})
export class HubFeed {

  /**
   * Definition of feed parameters
   */
  @Prop() collection:IHubCollection = null;
  
  /**
   * internal entries array
   */
  @State() entries:Array<any> = [];

  async componentWillRender() {
    await this.fetchResults();
  }
  async fetchResults() {
    if(!!this.collection?.scope) {
      const query:IQuery = this.collection?.scope;

      // Feed defaults to reverse chronological
      const options:IHubSearchOptions = {
        sortOrder: 'desc',
        sortField: 'modified',
        requestOptions: state.context.hubRequestOptions
      };

      const results = await hubSearch(query, options)
      this.entries = results.results;
    }
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-list>
          {this.entries?.map((entry) => {
            return (
              <calcite-list-item label={entry.name} description={timeAgo(entry.updatedDate)}>
                <calcite-icon scale="s" icon="files" slot="content-start"></calcite-icon>
                <calcite-dropdown scale="m" slot="actions-end">
                  <calcite-action icon="ellipsis" label="menu"  slot="dropdown-trigger"></calcite-action>
                  <calcite-dropdown-group>
                  <calcite-dropdown-item
                    onclick={() => { window.open( `${state.context.hubUrl}/content/${entry.id}` , '_blank'); }}
                  >
                    View Item
                  </calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
                {/* <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action> */}
              </calcite-list-item>
            )
          })}
        </calcite-list>
      </Host>
    );
  }

}
