import 'regenerator-runtime';
import { getContent } from '@focus-reactive/graphql-content-layer';

const conferenceSettings = require('../gulp/conference-settings');

describe('Content layer', () => {
  it('should render content', async () => {
    await getContent(conferenceSettings);
  });
});
