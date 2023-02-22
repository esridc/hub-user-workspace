import { IChannel, ISearchChannels, searchChannels } from '@esri/hub-discussions';
import { Component, Host, State, h } from '@stencil/core';
import state from '../../utils/state';

@Component({
  tag: 'hub-discussions-channels',
  styleUrl: 'hub-discussions-channels.css',
  shadow: true,
})
export class HubDiscussionsChannels {

  @State() channels:IChannel[] = [];

  async componentWillLoad() {
    this.channels = await this.getChannels();
  }

  async getChannels() {
    const channelQuery:ISearchChannels = {
      // access: [],
      // groups: [ this.channelId ],
    }
    const results = await searchChannels({
      data: channelQuery,
      ...state.context.hubRequestOptions
    });
    // this.channels = results.items;
    return results.items;

    // return this.channels;
  }


  render() {
    console.log("Render channels", this.channels)
    return (
      <Host>
        <slot></slot>
        <calcite-list>
        {this.channels.map((channel) => {
          return (
            <calcite-list-item label={channel.id} description={`Channel creator: ${channel.creator}`}>
              <calcite-icon scale="s" icon="speech-bubble" slot="content-start"></calcite-icon>
            </calcite-list-item>
          )
        })}
        </calcite-list>
      </Host>
    );
  }

}
