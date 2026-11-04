import type { ProfileDraft, UserProgressData } from './types';

export function getProfileDraft(progress: UserProgressData): ProfileDraft {
  if (progress.profileDraft?.userId === progress.profile.id) return progress.profileDraft;
  const profile = progress.profile;
  return {
    userId: profile.id, firstName: profile.firstName || progress.userName,
    lastName: profile.lastName || '', age: String(profile.age || 25),
    profession: profile.profession || 'Other', customProfession: profile.customProfession || '',
    learningGoal: profile.learningGoal || 'work', customGoal: profile.customGoal || '',
  };
}
