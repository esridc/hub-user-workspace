import { Component, Host, h } from '@stencil/core';
import { buildCollection } from '../../utils/feeds';

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
          
{/*       // Demo using Gallery card - but needs a "table" layout
          <workspace-card>
            <span slot="title">Recent Updates</span>
            <arcgis-hub-gallery
                gallery-type="item"
                query="Escondido"
                layout="list"
            />
          </workspace-card> */}
          
          <workspace-card>
            <span slot="title">Recent Updates</span>
            <hub-feed
                collection={buildCollection({query: 'Escondido', type: 'item'})}
            />
          </workspace-card>          

          {/* <workspace-card>
            <span slot="title">Recent Activity</span>
            {this.renderList()}
          </workspace-card> */}

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

          {/* <workspace-card>
            <span slot="title">Hub Guides</span>
            <hub-feed
              collection={guideCollection}
            ></hub-feed>
          </workspace-card> */}

        </div>
        {/* <arcgis-hub-workspace
          type="project" 
        ></arcgis-hub-workspace> */}
      </Host>
    );
  }

}
