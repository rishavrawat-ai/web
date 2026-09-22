import * as migration_20260922_045859_homepage_content from './20260922_045859_homepage_content';

export const migrations = [
  {
    up: migration_20260922_045859_homepage_content.up,
    down: migration_20260922_045859_homepage_content.down,
    name: '20260922_045859_homepage_content'
  },
];
