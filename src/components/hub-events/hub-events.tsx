import { Component, Host, State, h } from '@stencil/core';
import state from '../../utils/state';
import { IHubEvent } from '@esri/hub-common';
import { getMemberEvents } from '../../utils/events';

@Component({
  tag: 'hub-events',
  styleUrl: 'hub-events.css',
  shadow: true,
})
export class HubEvents {
  @State() events: IHubEvent[] = [];

  componentWillLoad() {
    this.getEvents();
  }

  /**
   * Full event
    {
      "attributes": {
        "OBJECTID": 43854,
        "title": "Esri DevSummit 2023",
        "location": "",
        "description": "Meet us at DevSummit in Palm Springs!",
        "startDate": 1678086000000,
        "endDate": 1678431600000,
        "organizerId": null,
        "organizerName": null,
        "organizerEmail": null,
        "url": "esri-dev-summit-2023",
        "pageId": "0",
        "capacity": null,
        "attendance": 0,
        "status": "public",
        "isCancelled": null,
        "groupId": "166531dc429c462a89b81f5ffc5e26cc",
        "siteId": "2b50a7e59f2045a097c58ab397ccf1d5",
        "initiativeId": "bb0e6da747f8447aa616705a8313d8a4",
        "surveyId": null,
        "CreationDate": 1677126846839,
        "Creator": "aturner_dcqa",
        "EditDate": 1677126863068,
        "Editor": "aturner_dcqa",
        "schemaVersion": 2,
        "organizers": "[{\"name\":\"Esri\",\"contact\":\"devsummit@esri.com\",\"username\":\"aturner_dcqa\"}]",
        "sponsors": "[]",
        "onlineLocation": "",
        "venue": "Renaissance-Palm Springs",
        "address1": "888 E Tahquitz Canyon Way, Palm Springs, California, 92262",
        "address2": "",
        "isAllDay": 1,
        "timeZone": null,
        "appIds": null,
        "imageAttributes": null,
        "videoUrl": null
      },
      "geometry": { "x": -116.53831999999994, "y": 33.823210000000074 }
    }
   */
  async getEvents() {
    const results = await getMemberEvents(state.context);

    console.debug('getEvents', {
      results,
    });
    this.events = results.results;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-list id="posts">
          {this.events.map(event => {
            return (
              <calcite-list-item label={event['title']} description={event['description']}>
                <calcite-icon scale="s" icon="event" slot="content-start"></calcite-icon>
                <div slot="content-end">{/* {timeAgo(event.received)} */}</div>
              </calcite-list-item>
            );
          })}
        </calcite-list>
      </Host>
    );
  }
}
