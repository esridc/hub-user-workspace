import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-user-workspace',
  styleUrl: 'hub-user-workspace.css',
  shadow: true,
})
export class HubUserWorkspace {

  render() {
    return (
      <Host>
        <slot name="header"></slot>

        <div class="space">
          <workspace-card>
            <span slot="title">About this Workspace</span>
            <hub-text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt ab cum, fugiat quae quia assumenda! Assumenda ducimus cupiditate maxime quae corrupti quaerat error, voluptatem nulla officia repudiandae? Magnam, aliquam dolorem?
            </hub-text>
          </workspace-card>

          <workspace-card>
            <span slot="title">Recent Updates</span>
            <arcgis-hub-gallery
                gallery-type="item"
                query="Escondido"
                layout="list"
            />
          </workspace-card>

          <workspace-card>
            <span slot="title">Recent Activity</span>
            {this.renderList()}
          </workspace-card>

          <workspace-card>
            <span slot="title">Engagement</span>
            <hub-activity-stats></hub-activity-stats>
          </workspace-card>

          <workspace-card>
            <span slot="title">Changelog</span>
            <hub-changelog></hub-changelog>
          </workspace-card>
          <workspace-card>
          <span slot="title">Hub Status</span>
            <hub-status></hub-status>
          </workspace-card>

          <workspace-card>
            <span slot="title">Hub Guides</span>
            <hub-feed></hub-feed>
          </workspace-card>

        </div>
        {/* <arcgis-hub-workspace
          type="project" 
        ></arcgis-hub-workspace> */}
      </Host>
    );
  }

  renderList() {
    return (
      <calcite-list>
  <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
    <calcite-avatar
      scale="l"
      slot="content-start"
      thumbnail="https://slm-assets.secondlife.com/assets/19947929/view_large/Capture_du_2018-03-04_20-40-56.jpg?1520192584"
    ></calcite-avatar>
    <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
    <calcite-avatar
      scale="l"
      slot="content-start"
      thumbnail="https://www.seekpng.com/png/detail/90-906849_89kib-1024x631-finn-finn-adventure-time-face.png"
    ></calcite-avatar>
    <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
  <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
    <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
    <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
    <calcite-avatar
      scale="l"
      slot="content-start"
      thumbnail="https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/c9/603138_454321168018988_647044807_n.png/revision/latest/scale-to-width-down/250?cb=20140624024310"
    ></calcite-avatar>
    <calcite-icon
      scale="s"
      icon="exclamation-mark-triangle"
      slot="content-end"
      style="color: var(--calcite-ui-danger)"
    ></calcite-icon>
    <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
    <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
  </calcite-list-item>
</calcite-list>
    )
  }
}
