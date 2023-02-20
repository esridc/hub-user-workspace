import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'workspace-card',
  styleUrl: 'workspace-card.css',
  shadow: true,
})
export class WorkspaceCard {

  render() {
    return (
      <Host>
        <div class="tab">
          {this.renderTab()}
        </div>
        <div class="tab-content">
          <span class="title">
            <slot name="title"></slot>
          </span>
          <span class="body">
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
  
  renderTab() {
    return (
      <calcite-list>
        <calcite-list-item label="Card" description="">
          <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
          <calcite-action icon="pencil" label="edit" slot="actions-end"></calcite-action>
          <calcite-action icon="x" label="delete" slot="actions-end"></calcite-action>
          <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
        </calcite-list-item>
      </calcite-list>      
    )
  }
}
