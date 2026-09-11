export function scoreReviewThemes(text: string, tags: string[] = []) {
  const normalized = text.toLowerCase();
  const themeMap: Record<string, number> = {
    cleanliness: /clean|dirty|mess|tidy|neat/.test(normalized) ? 1 : 0,
    safe: /safe|secure|comfortable|calm/.test(normalized) ? 1 : 0,
    driving: /drive|driver|route|shortcut|fast|safe/.test(normalized) ? 1 : 0,
    luggage: /luggage|bag|baggage|helped/.test(normalized) ? 1 : 0,
    language: /english|swahili|french|language/.test(normalized) ? 1 : 0,
    restaurant: /restaurant|food|recommend|eat/.test(normalized) ? 1 : 0,
    ac: /ac|aircon|cool|air conditioner/.test(normalized) ? 1 : 0,
    music: /music|playlist|radio/.test(normalized) ? 1 : 0
  };

  const matchedTags = tags.reduce<Record<string, number>>((acc, tag) => {
    const key = tag.toLowerCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const themes = Object.entries({ ...themeMap, ...matchedTags })
    .filter(([, value]) => value > 0)
    .map(([key]) => key);

  return {
    score: Math.min(themes.length * 10 + tags.length * 5, 100),
    themes
  };
}
