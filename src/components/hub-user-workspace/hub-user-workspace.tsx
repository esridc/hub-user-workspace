import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { buildCollection } from '../../utils/feeds';
import state from '../../utils/state';
import { adlib }  from 'adlib'

@Component({
  tag: 'hub-user-workspace',
  styleUrl: 'hub-user-workspace.css',
  shadow: true,
})
export class HubUserWorkspace {

  @Prop({ mutable: true }) client:string = null;
  @Prop({ mutable: true }) redirect:string = null;
  @Prop({ mutable: true }) portal:string = "https://www.arcgis.com";

  /** 
   * Default workspace config if the user doesn't have a saved config
   */
  @Prop() defaultConfig:string = "./data/default.json"

  // Loaded workspace configuration
  @State() config: any = null;

  componentWillLoad() {
    // the redirect may be set after loading based on deploy host
    state.app = {
      client: this.client,
      redirect: this.redirect,
      portal: this.portal
    }    
  }
  async loadConfiguration() {
    // Fetch workspace configuration properties
    let result = await fetch(`./data/${state.user.username}.json`);
    console.debug("loadConfiguration: result", {
      result
    });
    if(result.status === 404) {

      result = await fetch(`./${this.defaultConfig}`);
    }
    const data = await result.json();
    this.config = data;
  }

  @Watch('redirect')
  updateAppState(redirectUpdate:string) {
    // the redirect may be set after loading based on deploy host
    state.app.redirect = redirectUpdate;
  }

  componentDidLoad() {
    if(!!state.user) {
      this.loadConfiguration();
    }
  }
  render() {
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
          <div id="panel">
          
            {/* {this.renderWorkspace(this.config)} */}
            {!!state.user ? this.renderWorkspace(this.config) : <span>Sign in with AGO QA account.</span>}
          </div>
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

  renderWorkspace(config:any) {
    let spaceNav = [];
    let spacePanels = [];

    console.debug("Rendering workspaces");
    if(!!config) {
      config.spaces.map((space, _spaceIndex) => {
        // Build up panel nav sections
        spaceNav.push(
          <calcite-tab-title 
            // tab={`space${spaceIndex}`}
            selected={space.title === config.default}
          >{space.title}</calcite-tab-title>
        )
        let spacePanel = [];

        // Fill out the space panel 
        space.layout.cards.map((card) => {
          // TODO: wrap in function like https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
          const CardTag = `${card.type}`;
          const settings = {
            user: state.user
          };
          
          const cardProps = adlib(card.values, settings);
          const cardText = adlib(card.text, settings)
          
          Object.keys(cardProps).map((key) => {
            // Collections need catalogs
            if(key === 'collection') {
              cardProps[key] = buildCollection( cardProps[key] );
            }
          })
          
          spacePanel.push(
            <workspace-card>
              <span slot="title">{card.title}</span>
              <CardTag {...cardProps}>
                {cardText}
              </CardTag>
            </workspace-card>
          )
        }) // space[].layout.cards
        spacePanels.push(
          <calcite-tab 
            // tab={`space${spaceIndex}`}
            selected={space.title === config.default}
          >
            <div class="space">
              {spacePanel}
            </div>
          </calcite-tab>
        )
      })
    } else {
      // return this.renderDefaultWorkspace();
    }
    // wrapped in div because default workspace?

    const output = (
      <calcite-tabs>
        {/* TODO: tab-nav changes to title-nav in newer calcie */}
        <calcite-tab-nav slot="tab-nav">
          {spaceNav}
          <calcite-button
            appearance="transparent"
            icon-start="plus"
            onclick={(_ev) => {alert("This will create a new space")}}
          >
            Create Space
          </calcite-button>
        </calcite-tab-nav>
        {spacePanels}
      </calcite-tabs>
    )
    return output;
  }
  renderDefaultWorkspace() {
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

        <workspace-card>
          <span slot="title">Work in Progress</span>
          <hub-text>
            Todo:
            <ol>
              <li>Make Engagement Stats dynamic</li>
              <li>Add Nearby based on User places of interest</li>
            </ol>
          </hub-text>
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
