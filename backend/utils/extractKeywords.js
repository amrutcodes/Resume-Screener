const extractKeywords = (text) => {
  const COMMON_WORDS = new Set([
    'and', 'or', 'the', 'with', 'using', 'of', 'a', 'to', 'in', 'for', 'on',
    'is', 'this', 'that', 'by', 'as', 'an', 'are', 'be', 'from', 'at', 'it',
    'will', 'we', 'you', 'have', 'has', 'our', 'your', 'can', 'should'
  ]);

  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2 && !COMMON_WORDS.has(word));

  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  // Remove duplicates and return top 10 keywords
  return [...new Set(sorted)].slice(0, 10);
};

module.exports = extractKeywords;
