const tagColors: Record<string, { bg: string; text: string }> = {
  starred: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  project: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
  },
  figma: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
  },
  post: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
  },
  misc1: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
  },
};

const defaultColor = {
  bg: 'bg-zinc-100 dark:bg-zinc-800',
  text: 'text-zinc-600 dark:text-zinc-400',
};

export function getTagColors(tag: string) {
  return tagColors[tag] ?? defaultColor;
}
