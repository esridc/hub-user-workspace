import { searchGroups } from "@esri/arcgis-rest-portal";
import { getItem } from "@esri/arcgis-rest-portal";
import { IArcGISContext } from "@esri/hub-common";
// import * as HubTypes from './hub-types'
import { getEventQueryFromType, searchEvents } from "@esri/hub-events";
import { IQueryFeaturesOptions } from "@esri/arcgis-rest-feature-layer";

export async function getMemberEvents(context: IArcGISContext): Promise<any> {
    // Process:
    // 1. Find Portal eventGroups=Portal.search where(type=event && members.include?(user))
    // 2. Query Events Service where(groupId.include?(eventGroups)) && other filters (e.g. upcoming/nearby)
    // 3. Convert Group+Features into IHubEvent
    let events = [];
    let groups = await searchGroups({ 
        q: "tags:Hub Event Group", 
        params: { searchUserAccess: "groupMember", num: 100 }, 
        ...context.requestOptions 
    });
    
    let eventGroups = groups.results.reduce((teamResults, group) => {
        teamResults.push(`groupId = '${group.id}'`) // TODO: build this array elsewhere
        return teamResults;
    }, []); 


  
    try {
        
      // @esri/hub-events directly calls Feature Service instead of using the Hub API proxy.
      const item = await getItem(
        context.eventsConfig.publicViewId,
        {...context.requestOptions}
      );
      // TODO - get deterministic layer index
      const eventServiceUrl = `${item.url}/0`;

      // TODO: add support for all vs. upcoming events
      const searchOptions: IQueryFeaturesOptions = getEventQueryFromType("upcoming", {
        url: eventServiceUrl,
        authentication: context.session
      });

      if(!!eventGroups) {
        searchOptions.where += ` AND (${eventGroups.join(' OR ')})`
      }

      console.debug("getMemberEvents: getEventQueryFromType", {searchOptions});

      let eventFeatures = await searchEvents( searchOptions );
      console.debug("getMemberEvents: searchEvents", [searchOptions, eventFeatures]);
  
      events = eventFeatures.data.reduce((eventResults, event) => {
        // eventResults.push({
        //   id: event.id,
        //   name: event.attributes.title,
        //   summary: event.attributes.venue,
        //   description: event.attributes.description,
        //   hubtype: HubTypes.HubType.event
        // })
        eventResults.push( event.attributes )
        return eventResults;
      }, [])
    } catch(error) {
        console.error("Error in getMemberEvents", {
            error,
            context,
            portalUrl: context.portalUrl
        })
    }

    console.debug("getEvents 1", {
        events,
        groups,
        eventGroups
    })    
    // EventGroups are all events the user has registered, and events are matches for upcoming.
    return { results: events, meta: {total: eventGroups.length, count: events.length, start: 1 } };
  }