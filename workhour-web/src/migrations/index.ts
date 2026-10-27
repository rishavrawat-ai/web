import * as migration_20260921_000000_payload_core_baseline from './20260921_000000_payload_core_baseline';
import * as migration_20260922_045859_homepage_content from './20260922_045859_homepage_content';
import * as migration_20261009_012208_pages_services from './20261009_012208_pages_services';
import * as migration_20261009_032107_posts from './20261009_032107_posts';
import * as migration_20261009_042723_brand_site_foundation from './20261009_042723_brand_site_foundation';
import * as migration_20261009_080237_media_storage from './20261009_080237_media_storage';

export const migrations = [
  {
    up: migration_20260921_000000_payload_core_baseline.up,
    down: migration_20260921_000000_payload_core_baseline.down,
    name: '20260921_000000_payload_core_baseline',
  },
  {
    up: migration_20260922_045859_homepage_content.up,
    down: migration_20260922_045859_homepage_content.down,
    name: '20260922_045859_homepage_content',
  },
  {
    up: migration_20261009_012208_pages_services.up,
    down: migration_20261009_012208_pages_services.down,
    name: '20261009_012208_pages_services',
  },
  {
    up: migration_20261009_032107_posts.up,
    down: migration_20261009_032107_posts.down,
    name: '20261009_032107_posts',
  },
  {
    up: migration_20261009_042723_brand_site_foundation.up,
    down: migration_20261009_042723_brand_site_foundation.down,
    name: '20261009_042723_brand_site_foundation',
  },
  {
    up: migration_20261009_080237_media_storage.up,
    down: migration_20261009_080237_media_storage.down,
    name: '20261009_080237_media_storage'
  },
];
