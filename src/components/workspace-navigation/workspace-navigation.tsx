import { Component, Host, Listen, h } from '@stencil/core';
import state from "../../utils/state";

@Component({
  tag: 'workspace-navigation',
  styleUrl: 'workspace-navigation.css',
  shadow: true,
})
export class WorkspaceNavigation {
  
  /**
   * reference to sign-in button for onclick events
   */
  signinButton:HTMLButtonElement;

  signinClick() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignIn');
    document.dispatchEvent(evt);    
  }
  signoutClick() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignOut');
    document.dispatchEvent(evt);    
  }
  @Listen('arcgisAppIdentitySignedIn')
  signedinEvent(evt) {
    state.context = evt.detail;  
  }
  @Listen('arcgisAppIdentitySignedOut')
  signedoutEvent(_evt) {
    state.context = null;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <span id="title">
          ArcGIS Hub
        </span>
          <span id="profile">
          <arcgis-app-identity 
            client-id={state.app.client}
            redirect-uri={state.app.redirect}
            portal={state.app.portal}
          >  
          </arcgis-app-identity>

          
          {this.renderIdentity()}
        </span>
      </Host>
    );
  }

  renderIdentity() {
    if(!!state.user) {
      return (
        <calcite-dropdown>
          <calcite-button slot="dropdown-trigger">{state.user?.fullName}</calcite-button>
          <calcite-dropdown-group>
            <calcite-dropdown-item
              onclick={this.signoutClick}
            >Sign Out</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      )
    } else {
      return (
        <calcite-button
          ref={el => this.signinButton = el}
          onclick={this.signinClick}
        >
          Sign In
        </calcite-button>
      )
    }

          
  }

}
