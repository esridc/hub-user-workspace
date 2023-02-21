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
          predicates: [
            {
              term: [options.query ?? 'water'],
            },
          ],
        },
      ],
    },
  };
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
