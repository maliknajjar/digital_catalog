import { writable } from 'svelte/store';

export const activeScene = writable(1);

export const sceneThumbnails = writable([]);

export const classTree = writable([]);

export const currentClass = writable("");

// you can add an object instead of a number to fix the porblem of app not refreshing
// you can add index number and class name
export const currentClassIndex = writable({index: 0, class: ""});