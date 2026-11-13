const STORAGE_KEY = "aula-progress";
const LEGACY_KEY = "aula-html-progress";
const CHANGE_EVENT = "aula-progress-change";
const COURSE_SLUGS = ["html", "css", "javascript"];

function emptyState() {
  return COURSE_SLUGS.reduce((acc, slug) => {
    acc[slug] = [];
    return acc;
  }, {});
}

function sanitize(list) {
  return Array.isArray(list) ? list.filter((item) => typeof item === "string") : [];
}

export function readStored() {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const state = emptyState();
      COURSE_SLUGS.forEach((slug) => {
        state[slug] = sanitize(parsed?.[slug]);
      });
      return state;
    }
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const state = emptyState();
      state.html = sanitize(JSON.parse(legacy));
      return state;
    }
    return emptyState();
  } catch {
    return emptyState();
  }
}

function writeStored(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* emmagatzematge no disponible */
  }
}

import { useEffect, useState } from "react";

function useAllProgress() {
  const [progress, setProgress] = useState(emptyState);

  useEffect(() => {
    const sync = () => setProgress(readStored());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return progress;
}

export function useProgress(course) {
  const all = useAllProgress();
  return course ? all[course] || [] : [];
}

export function useTotalProgress() {
  const all = useAllProgress();
  return COURSE_SLUGS.reduce((sum, slug) => sum + (all[slug]?.length || 0), 0);
}

export const totalChaptersCount = COURSE_SLUGS;

export function toggleChapter(course, slug) {
  const state = readStored();
  const current = state[course] || [];
  state[course] = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
  writeStored(state);
}

export function resetProgress(course) {
  const state = readStored();
  if (course) {
    state[course] = [];
  } else {
    COURSE_SLUGS.forEach((slug) => {
      state[slug] = [];
    });
  }
  writeStored(state);
}
