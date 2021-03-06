// Type definitions for jest-image-snapshot 2.8
// Project: https://github.com/americanexpress/jest-image-snapshot#readme
// Definitions by: Janeene Beeforth <https://github.com/dawnmist>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

/// <reference types="jest" />

/**
 * Options to be passed to the 'pixelmatch' image diffing function.
 */
export interface PixelmatchOptions {
    /** Matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive. 0.1 by default. */
    readonly threshold?: number;
    /** If true, disables detecting and ignoring anti-aliased pixels. false by default. */
    readonly includeAA?: boolean;
}

export interface MatchImageSnapshotOptions {
    /**
     * Custom config passed to 'pixelmatch'
     */
    customDiffConfig?: PixelmatchOptions;
    /**
     * Custom snapshots directory.
     * Absolute path of a directory to keep the snapshot in.
     */
    customSnapshotsDir?: string;
    /**
     * A custom absolute path of a directory to keep this diff in
     */
    customDiffDir?: string;
    /**
     * A custom name to give this snapshot. If not provided, one is computed automatically.
     */
    customSnapshotIdentifier?: string;
    /**
     * Changes diff image layout direction, default is horizontal.
     */
    diffDirection?: 'horizontal' | 'vertical';
    /**
     * Removes coloring from the console output, useful if storing the results to a file.
     * Defaults to false.
     */
    noColors?: boolean;
    /**
     * Sets the threshold that would trigger a test failure based on the failureThresholdType selected. This is different
     * to the customDiffConfig.threshold above - the customDiffConfig.threshold is the per pixel failure threshold, whereas
     * this is the failure threshold for the entire comparison.
     * Defaults to 0.
     */
    failureThreshold?: number;
    /**
     * Sets the type of threshold that would trigger a failure.
     * Defaults to 'pixel'.
     */
    failureThresholdType?: 'pixel' | 'percent';
    /**
     * Updates a snapshot even if it passed the threshold against the existing one, defaults to false.
     */
    updatePassedSnapshot?: boolean;
}

/**
 * Function to be passed to jest's expect.extend.
 * Example:
 *   import { toMatchImageSnapshot } from 'jest-image-snapshot';
 *   expect.extend({ toMatchImageSnapshot });
 */
export function toMatchImageSnapshot(options?: MatchImageSnapshotOptions): { message(): string; pass: boolean; };

/**
 * Configurable function that can be passed to jest's expect.extend.
 * Example:
 *   import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
 *   const toMatchImageSnapshot = configureToMatchImageSnapshot({ noColors: true });
 *   expect.extend({ toMatchImageSnapshot });
 */
export function configureToMatchImageSnapshot(options: MatchImageSnapshotOptions): () => { message(): string; pass: boolean; };

declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchImageSnapshot(options?: MatchImageSnapshotOptions): R;
        }
    }
}
