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
    console.log('arcgisAppIdentitySignedIn', {evt})
    state.user = evt.detail._currentUser;
  
  }
  @Listen('arcgisAppIdentitySignedOut')
  signedoutEvent(evt) {
    console.log('arcgisAppIdentitySignedOut', {evt})
    state.user = null;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <arcgis-app-identity 
          client-id="sDSiUiURVoPBmjYJ" 
          redirect-uri="http://localhost:3333/redirect.html" 
          portal="https://qaext.arcgis.com">  
        </arcgis-app-identity>

        
        {this.renderIdentity()}
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
