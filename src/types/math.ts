export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface StepItem {
  stepNumber: number;
  title: string;
  badgeText?: string;
  content: string;
  mathExpression?: string;
  realLifeMeaning?: string;
  keyObservation?: string;
}

export interface PracticeQuestion {
  id: string;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];
  correctIndex: number;
  hints: string[];
  mistakeExplanations: Record<number, string>; // Explains why wrong option was chosen
  detailedExplanation: string;
  realLifeMeaning: string;
}

export interface CommonMistake {
  mistake: string;
  whyItHappens: string;
  correctWay: string;
  example: string;
}

export interface ChallengeQuestion {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  rewardXP: number;
  solutionBreakdown: string;
}

export interface RealWorldProject {
  id: string;
  topicId: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  icon: string;
  objective: string;
  projectScenario: string;
  howMathIsUsed: Array<{
    step: string;
    description: string;
    formula?: string;
  }>;
  interactiveTool:
    | 'rocket'
    | 'solar'
    | 'budget'
    | 'garden'
    | 'trip'
    | 'number'
    | 'square'
    | 'cube'
    | 'algebra'
    | 'profit'
    | 'interest'
    | 'stats';
  badgeReward: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  englishTerm: string;
  subtitle: string;
  level: DifficultyLevel;
  iconName: string;
  realLifeHook: {
    question: string;
    hookStory: string;
    contextImgDescription: string;
  };
  conceptExplanation: {
    title: string;
    description: string;
    coreFormulas: Array<{
      name: string;
      formula: string;
      whyItWorks: string;
      realLifeExample: string;
    }>;
  };
  simulationType:
    | 'trigonometry'
    | 'percentage'
    | 'ratio'
    | 'geometry'
    | 'speed'
    | 'numbers'
    | 'square'
    | 'cube'
    | 'algebra'
    | 'profitloss'
    | 'interest'
    | 'data';
  solvedExample: {
    problemStatement: string;
    scenarioImg: string;
    steps: StepItem[];
    realLifeSummary: string;
  };
  commonMistakes: CommonMistake[];
  practiceQuestions: PracticeQuestion[];
  quickRevisionPoints: string[];
  challenge: ChallengeQuestion;
}

export interface TopicCategory {
  id: string;
  title: string;
  englishTitle: string;
  icon: string;
  color: string;
  accentColor: string;
  description: string;
  realLifeSnippet: string;
  lessons: Lesson[];
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  solvedCount: number;
  clearedDoubtsCount: number;
  completedLessons: string[];
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
  }>;
}
