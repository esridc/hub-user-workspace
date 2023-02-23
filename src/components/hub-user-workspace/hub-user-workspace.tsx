import { Component, Host, Prop, h } from '@stencil/core';
import { buildCollection } from '../../utils/feeds';
import state from '../../utils/state';

@Component({
  tag: 'hub-user-workspace',
  styleUrl: 'hub-user-workspace.css',
  shadow: true,
})
export class HubUserWorkspace {

  @Prop({ mutable: true }) client:string = null;
  @Prop({ mutable: true }) redirect:string = null;
  @Prop({ mutable: true }) portal:string = "https://www.arcgis.com";

  componentWillLoad() {
    // Save app configuration properties

  }

  render() {
    state.app = {
      client: this.client,
      redirect: this.redirect,
      portal: this.portal
    }    
    return (
      <Host>
        <div class="workspace">
          <div id="global">
            <workspace-navigation></workspace-navigation>
          </div>
          <div id="header">
            <slot name="header"></slot>
          </div>
          <div id="navigation">navigation</div>
          <div id="space">{!!state.user ? this.renderWorkspace() : []}</div>
          {/* <arcgis-hub-workspace
            type="project" 
          ></arcgis-hub-workspace> */}

          <div id="footer">
            <em>footer...</em>
          </div>
        </div>
      </Host>
    );
  }

  renderWorkspace() {
    return (
      <div>
        <workspace-card>
          <span slot="title">About this Workspace</span>
          <hub-text>
            Personalized workspace for <a href={`${state.context.hubUrl}/people/${state.user.username}`}>{state.user.fullName}</a>. 
            <br /><br />
            There is quick access to my favorites, specific project discussions, and recent content.
          </hub-text>
        </workspace-card>

        <workspace-card>
          <span slot="title">Project Discussion</span>
          <hub-discussions-moderation channel-id={'0311a680ff1b44389ad0392f94d5bbbb'}></hub-discussions-moderation>
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
          <hub-feed collection={buildCollection({ query: ['Initiative'], type: 'item' })} />
        </workspace-card>

        <workspace-card>
          <span slot="title">Notifications</span>
          <hub-user-notifications></hub-user-notifications>
        </workspace-card>        

        <workspace-card>
          <span slot="title">Favorites</span>
          <hub-feed collection={buildCollection({ groups: [state.user.favGroupId], type: 'item' })} />
        </workspace-card>

        <workspace-card>
          <span slot="title">Engagement Stats</span>
          <hub-activity-stats></hub-activity-stats>
        </workspace-card>

        {/* <workspace-card>
              <span slot="title">Recent Activity</span>
              {this.renderList()}
            </workspace-card> */}

        <workspace-card>
          <span slot="title">Nearby</span>
          <em>map coming...</em>
        </workspace-card>

        <workspace-card>
          <span slot="title">Upcoming Events</span>
          <hub-events></hub-events>
        </workspace-card>

        <workspace-card>
          <span slot="title">Collaborations</span>
          <hub-collaborations></hub-collaborations>
        </workspace-card>

        <workspace-card>
          <span slot="title">Channels</span>
          <hub-discussions-channels></hub-discussions-channels>
        </workspace-card>

        <workspace-card>
          <span slot="title">Hub Changelog</span>
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
    );
  }
}
