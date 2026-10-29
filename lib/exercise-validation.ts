import { ExerciseItem } from './types';
import { normalizeEnglishText, compareSpokenToTarget } from './speech';

export function evaluateExerciseAnswer(exercise: ExerciseItem, input: string): boolean {
  const answer = normalizeEnglishText(input);
  if (!answer) return false;
  const accepted = [exercise.correctAnswer, ...(exercise.acceptedAnswers || [])];
  if (accepted.some(value => normalizeEnglishText(value) === answer)) return true;
  if (exercise.type === 'fill-blank' && exercise.promptEn.includes('___')) {
    return accepted.some(value => normalizeEnglishText(exercise.promptEn.replace(/___+/g, value)) === answer);
  }
  return exercise.type === 'speaking' && accepted.some(value => compareSpokenToTarget(input, value).isAcceptable);
}
