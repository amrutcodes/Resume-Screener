const screeningLogic = (resumeText, keywords = []) => {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return { score: 0, keywordsMatched: [] };
  }

  const keywordsMatched = [];

  keywords.forEach((keyword) => {
    if (!keyword || typeof keyword !== 'string') return;
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(resumeText)) {
      keywordsMatched.push(keyword);
    }
  });

  const score = Math.min(
    100,
    Number(((keywordsMatched.length / keywords.length) * 100).toFixed(2))
  );

  return { score, keywordsMatched };
};

module.exports = screeningLogic;
