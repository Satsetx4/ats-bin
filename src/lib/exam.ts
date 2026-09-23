export interface ExamScore {
  correctCount: number;
  total: number;
  score: number;
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.max(0, Math.min(index, Math.floor(random() * (index + 1))));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function selectBalancedQuestions<T extends { category: string }>(
  questions: readonly T[],
  count: number,
  random: () => number = Math.random,
): T[] {
  const targetCount = Math.min(questions.length, Math.max(0, Math.floor(count)));
  if (targetCount === 0) return [];

  const groups = new Map<string, T[]>();
  for (const question of questions) {
    const categoryQuestions = groups.get(question.category) ?? [];
    categoryQuestions.push(question);
    groups.set(question.category, categoryQuestions);
  }

  const categories = shuffle([...groups.keys()], random);
  const baseQuota = Math.floor(targetCount / categories.length);
  const extraCategories = new Set(shuffle(categories, random).slice(0, targetCount % categories.length));
  const shuffledGroups = new Map(
    categories.map(category => [category, shuffle(groups.get(category) ?? [], random)]),
  );
  const selected: T[] = [];

  for (const category of categories) {
    const quota = baseQuota + (extraCategories.has(category) ? 1 : 0);
    selected.push(...(shuffledGroups.get(category) ?? []).slice(0, quota));
  }

  if (selected.length < targetCount) {
    const selectedIds = new Set(selected);
    const remaining = shuffle(questions.filter(question => !selectedIds.has(question)), random);
    selected.push(...remaining.slice(0, targetCount - selected.length));
  }

  return shuffle(selected, random);
}

export function calculateExamScore(
  questions: readonly { correctAnswer: number }[],
  answers: readonly (number | null)[],
): ExamScore {
  const correctCount = questions.reduce(
    (count, question, index) => count + Number(answers[index] === question.correctAnswer),
    0,
  );
  const total = questions.length;

  return {
    correctCount,
    total,
    score: total === 0 ? 0 : Math.round((correctCount / total) * 100),
  };
}
