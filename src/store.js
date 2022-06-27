import { writable } from 'svelte/store';

export const activeScene = writable(1);

export const sceneThumbnails = writable([]);