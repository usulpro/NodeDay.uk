const conferenceSettings = require('../gulp/conference-settings');
const {
  passConferenceSettings,
} = require('@focus-reactive/graphql-content-layer/dist/content.stories');

passConferenceSettings(conferenceSettings);
