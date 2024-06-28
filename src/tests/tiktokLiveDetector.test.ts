import { describe, expect, test, vi } from 'vitest';
import liveDetectorService from '../services/tiktokLiveDetector';
import { testUsers } from '../config/test-config';
import axios from 'axios';

const SECONDS = 1000;
describe(
  'TikTok Live Stream Detection',
  () => {
    describe('Verify by video tag', () => {
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
    });

    describe('Verify by TikTok API', () => {
      test.concurrent(
        'Should return success true and status 2 when user is streaming',
        async () => {
          const result = await liveDetectorService.isLiveByTiktokApi(
            testUsers.activeUser
          );
          expect(result.success).toBe(true);
          expect(result.data).toBe('2');
          expect(result.error).toBeUndefined();
        }
      );
      test.concurrent(
        'Should return success false when user is not streaming',
        async () => {
          const result = await liveDetectorService.isLiveByTiktokApi(
            testUsers.inactiveUser
          );
          expect(result.success).toBe(false);
          expect(result.data).toBe('Room id not found');
          expect(result.error).toBeUndefined();
        }
      );

      test('Should handle network errors', async () => {
        vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));

        const result = await liveDetectorService.isLiveByTiktokApi(
          testUsers.activeUser
        );

        expect(result.success).toBe(false);
        expect(result.data).toBeNull();
        expect(result.error).toContain('Network Error');

        vi.resetAllMocks();
      });
    });
  },
  100 * SECONDS
);
