import { IHubCollection, IHubSearchOptions, IQuery, hubSearch } from '@esri/hub-common';
import { Component, Host, Prop, State, h } from '@stencil/core';
import { timeAgo } from '../../utils/time';

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
        requestOptions: {},
        sortOrder: 'desc',
        sortField: 'modified'
      };

      console.log({collection: this.collection})
      const results = await hubSearch(query, options)
      console.log({collection: this.collection, results})
      this.entries = results.results;
      // this.results = 
    }
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <div id="entries">
          {this.entries?.map((entry) => {
            return (
              <div class="entry">
                <span class="title">{entry.name}</span>
                <span class="timestamp">
                  {timeAgo(entry.updatedDate)}
                </span>
              </div>
            )
          })}
        </div>
      </Host>
    );
  }

}
