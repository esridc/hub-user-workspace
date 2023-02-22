import { IPost, ISearchPosts, searchPosts } from '@esri/hub-discussions';
import { Component, Host, Prop, h } from '@stencil/core';
import state from '../../utils/state';
import { timeAgo } from '../../utils/time';

@Component({
  tag: 'hub-discussions-moderation',
  styleUrl: 'hub-discussions-moderation.css',
  shadow: true,
})
export class HubDiscussionsModeration {

  @Prop() channelId:string = null;
  @Prop({ mutable: true, reflect: true }) posts:IPost[] = [];

  async componentWillLoad() {
    this.posts = await this.getChannelPosts(this.channelId);
  }

  async getChannelPosts(channel:string) {
    console.debug("getChannelPosts", {channel})

    const postsQuery:ISearchPosts = {
      // access: [],
      channels: [ this.channelId ],
    }
    const results = await searchPosts({
      data: postsQuery,
      ...state.context.hubRequestOptions
    });
    // this.channels = results.items;
    return results.items;

    // return this.channels;
  }


  render() {
    console.log("Render posts", this.posts)
    return (
      <Host>
        <slot></slot>
        <calcite-list id="posts">
        {this.posts.map((post) => {
          return (
            <calcite-list-item description={post.creator} label={post.body}>
              <calcite-icon scale="s" icon="speech-bubble" slot="content-start"></calcite-icon>
              <div slot="content-end">
                {timeAgo(post.createdAt)}
                <calcite-chip class="list-chip" icon="organization" scale="s">Staff</calcite-chip>
              </div>
            </calcite-list-item>
          )
        })}
        </calcite-list>
        
        <hub-discussions-post-editor id="editor" channel-id={this.channelId}></hub-discussions-post-editor>

      </Host>
    );
  }

}
