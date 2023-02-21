/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IHubCollection } from "@esri/hub-common";
export namespace Components {
    interface HubActivityStats {
    }
    interface HubChangelog {
    }
    interface HubFeed {
        /**
          * Definition of feed parameters
         */
        "collection": IHubCollection;
    }
    interface HubStatus {
        "statusUrl": string;
    }
    interface HubText {
    }
    interface HubUserWorkspace {
    }
    interface WorkspaceCard {
    }
    interface WorkspaceNavigation {
    }
}
declare global {
    interface HTMLHubActivityStatsElement extends Components.HubActivityStats, HTMLStencilElement {
    }
    var HTMLHubActivityStatsElement: {
        prototype: HTMLHubActivityStatsElement;
        new (): HTMLHubActivityStatsElement;
    };
    interface HTMLHubChangelogElement extends Components.HubChangelog, HTMLStencilElement {
    }
    var HTMLHubChangelogElement: {
        prototype: HTMLHubChangelogElement;
        new (): HTMLHubChangelogElement;
    };
    interface HTMLHubFeedElement extends Components.HubFeed, HTMLStencilElement {
    }
    var HTMLHubFeedElement: {
        prototype: HTMLHubFeedElement;
        new (): HTMLHubFeedElement;
    };
    interface HTMLHubStatusElement extends Components.HubStatus, HTMLStencilElement {
    }
    var HTMLHubStatusElement: {
        prototype: HTMLHubStatusElement;
        new (): HTMLHubStatusElement;
    };
    interface HTMLHubTextElement extends Components.HubText, HTMLStencilElement {
    }
    var HTMLHubTextElement: {
        prototype: HTMLHubTextElement;
        new (): HTMLHubTextElement;
    };
    interface HTMLHubUserWorkspaceElement extends Components.HubUserWorkspace, HTMLStencilElement {
    }
    var HTMLHubUserWorkspaceElement: {
        prototype: HTMLHubUserWorkspaceElement;
        new (): HTMLHubUserWorkspaceElement;
    };
    interface HTMLWorkspaceCardElement extends Components.WorkspaceCard, HTMLStencilElement {
    }
    var HTMLWorkspaceCardElement: {
        prototype: HTMLWorkspaceCardElement;
        new (): HTMLWorkspaceCardElement;
    };
    interface HTMLWorkspaceNavigationElement extends Components.WorkspaceNavigation, HTMLStencilElement {
    }
    var HTMLWorkspaceNavigationElement: {
        prototype: HTMLWorkspaceNavigationElement;
        new (): HTMLWorkspaceNavigationElement;
    };
    interface HTMLElementTagNameMap {
        "hub-activity-stats": HTMLHubActivityStatsElement;
        "hub-changelog": HTMLHubChangelogElement;
        "hub-feed": HTMLHubFeedElement;
        "hub-status": HTMLHubStatusElement;
        "hub-text": HTMLHubTextElement;
        "hub-user-workspace": HTMLHubUserWorkspaceElement;
        "workspace-card": HTMLWorkspaceCardElement;
        "workspace-navigation": HTMLWorkspaceNavigationElement;
    }
}
declare namespace LocalJSX {
    interface HubActivityStats {
    }
    interface HubChangelog {
    }
    interface HubFeed {
        /**
          * Definition of feed parameters
         */
        "collection"?: IHubCollection;
    }
    interface HubStatus {
        "statusUrl"?: string;
    }
    interface HubText {
    }
    interface HubUserWorkspace {
    }
    interface WorkspaceCard {
    }
    interface WorkspaceNavigation {
    }
    interface IntrinsicElements {
        "hub-activity-stats": HubActivityStats;
        "hub-changelog": HubChangelog;
        "hub-feed": HubFeed;
        "hub-status": HubStatus;
        "hub-text": HubText;
        "hub-user-workspace": HubUserWorkspace;
        "workspace-card": WorkspaceCard;
        "workspace-navigation": WorkspaceNavigation;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "hub-activity-stats": LocalJSX.HubActivityStats & JSXBase.HTMLAttributes<HTMLHubActivityStatsElement>;
            "hub-changelog": LocalJSX.HubChangelog & JSXBase.HTMLAttributes<HTMLHubChangelogElement>;
            "hub-feed": LocalJSX.HubFeed & JSXBase.HTMLAttributes<HTMLHubFeedElement>;
            "hub-status": LocalJSX.HubStatus & JSXBase.HTMLAttributes<HTMLHubStatusElement>;
            "hub-text": LocalJSX.HubText & JSXBase.HTMLAttributes<HTMLHubTextElement>;
            "hub-user-workspace": LocalJSX.HubUserWorkspace & JSXBase.HTMLAttributes<HTMLHubUserWorkspaceElement>;
            "workspace-card": LocalJSX.WorkspaceCard & JSXBase.HTMLAttributes<HTMLWorkspaceCardElement>;
            "workspace-navigation": LocalJSX.WorkspaceNavigation & JSXBase.HTMLAttributes<HTMLWorkspaceNavigationElement>;
        }
    }
}
