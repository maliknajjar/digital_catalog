import { writable } from 'svelte/store';

export const activeScene = writable(0);

export const sceneThumbnails = writable([]);