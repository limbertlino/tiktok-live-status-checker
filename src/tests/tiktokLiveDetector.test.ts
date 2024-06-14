import { describe, expect, test } from 'vitest';
import liveDetectorService from '../services/tiktokLiveDetector';
import { testUsers } from '../config/test-config';

const SECONDS = 1000;
describe(
  'TikTok Live Stream Detection',
  () => {
    test.concurrent(
      'Should return true for a user who is currently live',
      async () => {
        const result = await liveDetectorService.isLiveByVideoTag(
          testUsers.activeUser
        );

        expect(result.success).toBe(true);
      }
    );
    test.concurrent(
      'Should return false for a user who is not currently live',
      async () => {
        const result = await liveDetectorService.isLiveByVideoTag(
          testUsers.inactiveUser
        );

        expect(result.success).toBe(false);
      }
    );
  },
  100 * SECONDS
);
