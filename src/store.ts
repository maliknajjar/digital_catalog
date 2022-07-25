import { writable } from 'svelte/store';


export const activeScene = writable(1);

export const sceneThumbnails = writable([]);

export const classTree = writable([]);

export const currentClass = writable("");

export const everyClassesIndex = writable([]);

export const isLoading = writable(true);

export const isUIhidden = writable(false);