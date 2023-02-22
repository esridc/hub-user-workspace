import { Component, Host, Prop, h } from '@stencil/core';
import state from '../../utils/state';
import { ICreatePost, createPost } from '@esri/hub-discussions';

@Component({
  tag: 'hub-discussions-post-editor',
  styleUrl: 'hub-discussions-post-editor.css',
  shadow: true,
})
export class HubDiscussionsPostEditor {

  @Prop() channelId:string = null;
  postBodyInput:HTMLInputElement;

  componentDidRender() {
    console.log('postEditor did render', this.postBodyInput)
  }
  postSubmitted(_evt) {
    console.log("postSubmitted", {
      // el: this.postBodyInput,
      value: this.postBodyInput.value,
      _evt
    })
    this.createPost(
      this.postBodyInput.value
    )
  }
  async createPost(body: string) {
    const data:ICreatePost = {
      channelId: this.channelId,
      body: body
    }
    const postResult = createPost({
      data,
      ...state.context.hubRequestOptions
    })
    return postResult;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-label>
          <span id="prompt">What's on your mind?</span>
          <calcite-input
              id="input-with-text-area"
              type="input"
              value=""
              placeholder="Write your discussion post."
              alignment="start"
              number-button-type="vertical"
              scale="m"
              status="idle"
              ref={el => this.postBodyInput = el}
          >
            <calcite-button slot="action"
              onclick={this.postSubmitted.bind(this)}
            >post</calcite-button>

          </calcite-input>
          <calcite-input-message status="idle" scale="m">
            help
          </calcite-input-message>        

        </calcite-label>

      </Host>
    );
  }

}
