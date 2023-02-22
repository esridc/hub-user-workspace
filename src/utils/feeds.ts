import { IHubCollection } from '@esri/hub-common';

export function buildCollection(options) {
  const collection = {
    key: 'collection',
    label: 'collection',
    targetEntity: options.type ?? 'item',
    scope: {
      targetEntity: options.type ?? 'item',
      filters: [
        {
          predicates: [],
        },
      ],
    },
  };
  if(!!options.query) {
    collection.scope.filters[0].predicates.push({
      term: options.query
    })
  }
  if(!!options.groups) {
    collection.scope.filters[0].predicates.push({
      group: options.groups
    })
  }
    // const collection = guideCollection;
  return collection;
}

export const guideCollection: IHubCollection = {
  key: 'hubGuides',
  label: 'Hub Guides',
  targetEntity: 'item',
  scope: {
    targetEntity: 'item',
    filters: [
      {
        predicates: [
          {
            tags: {
              all: ['hubguide'],
            },
          },
        ],
      },
    ],
  },
};
