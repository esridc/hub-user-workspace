import { IChannel, ISearchChannels, searchChannels } from '@esri/hub-discussions';
import { Component, Host, State, h } from '@stencil/core';
import state from '../../utils/state';

@Component({
  tag: 'hub-discussions-moderation',
  styleUrl: 'hub-discussions-moderation.css',
  shadow: true,
})
export class HubDiscussionsModeration {

  @State() channels:IChannel[] = [];

  async getChannels(user) {
    console.debug("getChannels")
    if(!!user) {
      const channelQuery:ISearchChannels = {
        // access: [],
        // groups: [],
      }
      const results = await searchChannels({
        data: channelQuery,
        token: user?.token
      });
      // this.channels = results.items;
      return results.items;
    } else {
      // this.channels = [];
      return []
    }
    // return this.channels;
  }


  async render() {
    const channels = await this.getChannels(state.user)
    console.log("channels", channels)
    return (
      <Host>
        <slot></slot>
        {channels.map((channel) => {
          return (
            <p>{channel}</p>
          )
        })}
      </Host>
    );
  }

}
