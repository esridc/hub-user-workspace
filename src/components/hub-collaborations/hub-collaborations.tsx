import { Component, Host, State, h } from '@stencil/core';
import state from '../../utils/state';
import { searchGroups, SearchQueryBuilder } from "@esri/arcgis-rest-portal";
import { ICreateChannel, PostStatus, SharingAccess, createChannel } from '@esri/hub-discussions';

@Component({
  tag: 'hub-collaborations',
  styleUrl: 'hub-collaborations.css',
  shadow: true,
})
export class HubCollaborations {

  @State() groups = [];

  async componentWillRender() {
    this.groups = await this.getGroups(state.user);

  }
  async getGroups(user) {
    if(!user) {
      return [];
    }
    
    const groupsQuery = new SearchQueryBuilder()
      .match( user.username )
      .in("owner")
    const groups = await searchGroups( {
      q: groupsQuery,
      portal: `${state.app.portal}/sharing`
    });
    console.log({groups})
    return groups.results;
  }

  // This won't work until I can figure out how to use QA discussions
  async requestChannel(groupId) {
    const createOptions:ICreateChannel = {
      access: SharingAccess.PUBLIC,
      groups: [groupId],
      defaultPostStatus: PostStatus.APPROVED
    }

    console.debug("createChannel", {groupId})
    const response = createChannel({
      data: createOptions,
      ...state.context.hubRequestOptions
    });

    console.debug("createChannel", {response});
  }

  render() {

    return (
      <Host>
        <slot></slot>
        <calcite-list>
        {this.groups.map((group) => {
          return (
          <calcite-list-item label={group.title} description={group.snippet}>
            <calcite-avatar
              scale="m"
              slot="content-start"
              thumbnail="https://www.seekpng.com/png/detail/90-906849_89kib-1024x631-finn-finn-adventure-time-face.png"
            ></calcite-avatar>
            <calcite-dropdown
              scale="m"
              slot="actions-end"
            >
              <calcite-action icon="ellipsis" label="menu" slot="dropdown-trigger"></calcite-action>
              <calcite-dropdown-group>
                <calcite-dropdown-item
                  id={`group-${group.id}`}
                  onclick={() => {this.requestChannel(group.id)}}
                >
                  Create Channel
                </calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
            {/* <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action> */}
            {/* <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action> */}
          </calcite-list-item>
          )
        })}
        </calcite-list>
      </Host>
    );
  }

}
