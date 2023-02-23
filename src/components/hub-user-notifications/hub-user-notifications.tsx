import { Component, Host, State, h } from '@stencil/core';
import { getUserNotifications, INotification } from '@esri/arcgis-rest-portal';
import state from '../../utils/state';
import { timeAgo } from '../../utils/time';

@Component({
  tag: 'hub-user-notifications',
  styleUrl: 'hub-user-notifications.css',
  shadow: true,
})
export class HubUserNotifications {

  @State() notifications:INotification[] = [];

  componentWillLoad() {
    this.getNotifications();
  }

  async getNotifications() {
    const results = await getUserNotifications({
      ...state.context.requestOptions
    })
    this.notifications = results.notifications;
  }
  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-list id="posts">
        {this.notifications.map((notification) => {
          return (
            <calcite-list-item label={notification.type} description={notification.data.groupTitle}>
              <calcite-icon scale="s" icon="envelope" slot="content-start"></calcite-icon>
              <div slot="content-end">
                {timeAgo(notification.received)}
              </div>
            </calcite-list-item>
          )
        })}
        </calcite-list>
      </Host>
    );
  }

}
