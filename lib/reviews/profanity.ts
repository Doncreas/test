const PROFANITY_WORDS = [
  'damn',
  'hell',
  'idiot',
  'stupid',
  'loser',
  'trash',
  'hate',
  'moron',
  'asshole',
  'bastard',
  'crap',
  'shit',
  'fuck',
  'fool'
];

export function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase().replace(/[^a-z\s]/g, ' ');
  return PROFANITY_WORDS.some((word) => normalized.includes(word));
}

export function sanitizeReviewText(text: string): string {
  if (!text) return '';

  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}
