export const MONTHS_LESSON_ID = 'lesson-3-months';
export const MONTH_GROUP_SIZE = 3;

export interface LearningMonth {
  id: string;
  number: number;
  english: string;
  pronunciation: string;
  armenian: string;
}

// Keep the original lesson IDs: existing answers and bookmarks remain valid.
export const LEARNING_MONTHS: readonly LearningMonth[] = [
  {id: 's-11', number: 1, english: 'January', pronunciation: 'Ջենյուերի', armenian: 'հունվար'},
  {id: 's-12', number: 2, english: 'February', pronunciation: 'Ֆեբրուերի', armenian: 'փետրվար'},
  {id: 's-13', number: 3, english: 'March', pronunciation: 'Մարչ', armenian: 'մարտ'},
  {id: 's-14', number: 4, english: 'April', pronunciation: 'Էյփրիլ', armenian: 'ապրիլ'},
  {id: 's-15', number: 5, english: 'May', pronunciation: 'Մեյ', armenian: 'մայիս'},
  {id: 's-16', number: 6, english: 'June', pronunciation: 'Ջուն', armenian: 'հունիս'},
  {id: 'beginner-july', number: 7, english: 'July', pronunciation: 'Ջուլայ', armenian: 'հուլիս'},
  {id: 'beginner-august', number: 8, english: 'August', pronunciation: 'Օգըսթ', armenian: 'օգոստոս'},
  {id: 'beginner-september', number: 9, english: 'September', pronunciation: 'Սեփթեմբըր', armenian: 'սեպտեմբեր'},
  {id: 'beginner-october', number: 10, english: 'October', pronunciation: 'Օքթոուբըր', armenian: 'հոկտեմբեր'},
  {id: 'beginner-november', number: 11, english: 'November', pronunciation: 'Նոուվեմբըր', armenian: 'նոյեմբեր'},
  {id: 'beginner-december', number: 12, english: 'December', pronunciation: 'Դիսեմբըր', armenian: 'դեկտեմբեր'},
];

export const MONTH_GROUPS = Array.from({length: LEARNING_MONTHS.length / MONTH_GROUP_SIZE}, (_, index) => {
  const months = LEARNING_MONTHS.slice(index * MONTH_GROUP_SIZE, (index + 1) * MONTH_GROUP_SIZE);
  return {months, titleAm: `${months[0].armenian} — ${months[months.length - 1].armenian}`};
});
