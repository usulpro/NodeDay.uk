const { configure, addParameters } = require('@storybook/react');
import { create } from '@storybook/theming';
require('@storybook/addon-console');

const theme = create({
  base: 'light',
  colorSecondary: '#ff2407',
  brandTitle: 'GitNation',
  brandUrl: 'https://gitnation.org/',
  brandImage: 'https://jsnation.com/img/face.svg',
});

addParameters({
  options: {
    theme,
  },
});

configure(() => require('./index.stories'), module);
