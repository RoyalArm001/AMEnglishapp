'use client';

import { useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, ChevronRight,
  Headphones, Layers, Lightbulb, MessageCircle, Mic, Sparkles, PenLine,
} from 'lucide-react';
import { SITE_UPDATES } from '../data/site-updates';
import { APP_VERSION } from '../lib/pwa';
import { A1_CHAPTERS, A1_TEXTBOOKS } from '../data/a1-course';
import { areCourseLessonsComplete, canOpenCourseLesson, getCourseLessons, getCurrentCourseLesson, isLevelCourseComplete } from '../lib/learning-path';
import type { UserProgressData } from '../lib/types';
import styles from './DashboardView.module.css';

type HomeDestination = 'Lessons' | 'Daily Words' | 'Book Library' | 'Grammar Academy' | 'Voice Practice' | 'Vocabulary';

const DISCOVER_SECTIONS = [
  {
    tab: 'Book Library', title: 'Պատմություններ, որոնք բացում են նոր աշխարհներ',
    category: 'Գրադարան', description: 'Բացահայտիր անգլերենը գրքերի, պատմությունների և պոեզիայի միջոցով։',
    icon: BookOpen, tone: 'apricot', action: 'Բացել գրադարանը',
  },
  {
    tab: 'Grammar Academy', title: 'Բարդ կանոնները՝ պարզ բացատրությամբ',
    category: 'Քերականություն', description: 'Հասկացիր՝ ինչպես են բառերը դառնում իմաստ ունեցող նախադասություններ։',
    icon: Layers, tone: 'lavender', action: 'Դիտել թեմաները',
  },
  {
    tab: 'Voice Practice', title: 'Լսելուց՝ դեպի ինքնուրույն խոսք',
    category: 'Խոսք և լսողություն', description: 'Լսիր արտասանությունը և փորձիր արտահայտել մտքերդ անգլերենով։',
    icon: Mic, tone: 'mint', action: 'Բացել պարապմունքը',
  },
  {
    tab: 'Vocabulary', title: 'Բառեր՝ իրական կյանքում օգտագործելու համար',
    category: 'Բառապաշար', description: 'Գտիր նոր բառեր, պահպանիր ընտրյալները և վերադարձիր բառաքարտերին։',
    icon: BookOpen, tone: 'sky', action: 'Բացել բառարանը',
  },
] as const;

const TIPS = [
  {
    title: 'Բառը կապիր քո կյանքի հետ։',
    text: 'Նոր բառ սովորելիս կազմիր քեզ վերաբերող մեկ նախադասություն։ Այդպես բառը կդառնա քո մտքերն արտահայտելու միջոց։',
  },
  {
    title: 'Լսիր, կանգ առ, կրկնիր։',
    text: 'Ընտրիր կարճ արտահայտություն։ Լսիր այն, մի պահ կանգ առ և կրկնիր բարձրաձայն՝ ուշադրություն դարձնելով շեշտադրությանը։',
  },
  {
    title: 'Վերադարձիր արդեն սովորածին։',
    text: 'Մինչև նոր նյութին անցնելը հիշիր երեկվա մի քանի բառերը։ Փորձիր դրանցով պատմել քո օրվա մասին։',
  },
];

export default function DashboardView({ onNavigate, canNavigate, progress, onOpenLesson }: {
  onNavigate: (tab: HomeDestination) => void;
  canNavigate: (tab: HomeDestination) => boolean;
  progress: UserProgressData;
  onOpenLesson: (id: string) => void;
}) {
  const [tipIndex, setTipIndex] = useState(0);
  const tip = TIPS[tipIndex];
  const visibleSections = DISCOVER_SECTIONS.filter(section => canNavigate(section.tab));
  const beginner = progress.level === 'A1';
  const currentLesson = getCurrentCourseLesson(progress);
  const assessmentPending = beginner && areCourseLessonsComplete(progress) && !isLevelCourseComplete(progress);
  const courseOrder = getCourseLessons(progress.level).map(lesson => lesson.id);
  const books = A1_TEXTBOOKS.map(book => ({...book,
    chapters: A1_CHAPTERS.filter(chapter => chapter.bookId === book.id && canOpenCourseLesson(progress, chapter.lessonId))
      .sort((a, b) => courseOrder.indexOf(a.lessonId) - courseOrder.indexOf(b.lessonId)),
  })).filter(book => book.chapters.length > 0);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}><span className={styles.dot} /> {progress.level} · Քայլ առ քայլ՝ քո տեմպով</span>
          <h1 id="home-heading">{beginner ? <>Առաջին տառից՝<br /><em>քո առաջին</em><br />զրույցին։</> : <>Անգլերենը՝<br /><em>քո առօրյայի</em><br />մի մասը։</>}</h1>
          <p className={styles.intro}>
            {beginner ? 'Սկսիր զրոյից։ Սովորիր տառերն ու բառերը, գրիր ինքդ, կարդա քո դասի պատմությունը։ Ամեն ավարտված քայլ քեզ մոտեցնում է ինքնուրույն անգլերենին։' : 'Շարունակիր քո մակարդակի դասապլանը՝ հայերեն բացատրություններով, լսելով ու գրելով։'}
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryAction} onClick={() => onNavigate('Lessons')}>
              {assessmentPending ? 'Սկսել ամփոփիչ աշխատանքը' : 'Շարունակել իմ դասապլանը'} <ArrowRight size={18} aria-hidden="true" />
            </button>
            {visibleSections.length > 0 && <a className={styles.secondaryAction} href="#discover-haylingo">
              Բացահայտել <ArrowDown size={16} aria-hidden="true" />
            </a>}
          </div>
          {currentLesson && !assessmentPending && !isLevelCourseComplete(progress) && <p className={styles.currentLesson}>Քո հաջորդ կանգառը՝ {currentLesson.titleAm}</p>}
        </div>

        <div className={styles.artwork} aria-hidden="true">
          <div className={styles.orbit} />
          <span className={styles.artLabel}>Հայերենից՝ նոր հնարավորություններ</span>
          <div className={styles.wordCard}>
            <div className={styles.cardTop}><Sparkles size={22} /><span>HayLingo</span></div>
            <p className={styles.englishPhrase} lang="en">A little<br />every day.</p>
            <p className={styles.armenianPhrase}>Ամեն օր՝ մի փոքր։</p>
            <div className={styles.cardBottom}><span /><span /><span /></div>
          </div>
          <div className={styles.speechBubble}><MessageCircle size={20} /><span lang="en">Hello!</span><span>Բարև՜</span></div>
          <div className={styles.artSteps}>
            <span><Headphones size={17} />Լսիր</span>
            <span><BookOpen size={17} />Կարդա</span>
            <span><PenLine size={17} />Գրիր</span>
          </div>
        </div>
      </section>

      {beginner && <section className={styles.discover} aria-labelledby="learning-route-heading">
        <div className={styles.sectionHeading}><div><span className={styles.kicker}>Պարզ և հասկանալի ճանապարհ</span><h2 id="learning-route-heading">Ինչպես ես առաջ գնալու</h2></div></div>
        <ol className={styles.learningSteps}>
          {[
            ['Սովորիր', 'Տառեր ու պարզ բառեր՝ ձայնով և հայերեն բացատրությամբ։'],
            ['Գրիր', 'Ճիշտ գրած պատասխանը բացում է հաջորդ քայլը։'],
            ['Կարդա', 'Քո դասի գլուխը դասագրքում՝ հասկանալու հարցերով։'],
            ['Ամփոփիր', 'Բոլոր դասերից հետո՝ պարտադիր աշխատանք, ապա A2։'],
          ].map(([title, description], index) => <li key={title}><span className={styles.stepNumber}>{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}
        </ol>
      </section>}

      {beginner && books.length > 0 && <section className={styles.discover} aria-labelledby="course-books-heading">
        <div className={styles.sectionHeading}><div><span className={styles.kicker}>HayLingo · A1</span><h2 id="course-books-heading">Քո դասագրքերը</h2></div><p>Նոր գլուխները բացվում են համապատասխան դասի հետ։</p></div>
        <div className={styles.bookGrid}>{books.map(book => {
          const chapter = book.chapters.find(item => item.lessonId === currentLesson?.id) || book.chapters[book.chapters.length - 1];
          return <article key={book.id} className={styles.feature} data-tone="mint">
            <span className={styles.featureIcon}><BookOpen size={23} /></span>
            <h3>{book.titleAm}</h3><p>{book.subtitleAm}</p>
            <span className={styles.category}>{book.chapters.length} հասանելի գլուխ</span>
            <button type="button" className={styles.featureAction} onClick={() => onOpenLesson(chapter.lessonId)}>Բացել համապատասխան դասը <ArrowRight size={16} /></button>
          </article>;
        })}</div>
      </section>}

      {visibleSections.length > 0 && <section id="discover-haylingo" className={styles.discover} aria-labelledby="discover-heading">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>Բացահայտիր HayLingo-ն</span>
            <h2 id="discover-heading">Ի՞նչն է քեզ հետաքրքրում</h2>
          </div>
          <p>Ընտրիր քո ճանապարհը դեպի անգլերեն։</p>
        </div>
        <div className={styles.features}>
          {visibleSections.map(({ tab, title, category, description, icon: Icon, tone, action }) => (
            <article key={tab} className={styles.feature} data-tone={tone}>
              <span className={styles.featureTop}>
                <span className={styles.featureIcon}><Icon size={23} aria-hidden="true" /></span>
                <ArrowUpRight size={19} className={styles.cornerArrow} aria-hidden="true" />
              </span>
              <span className={styles.category}>{category}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <button type="button" className={styles.featureAction} onClick={() => onNavigate(tab)}>{action}<ArrowRight size={16} aria-hidden="true" /></button>
            </article>
          ))}
        </div>
      </section>}

      <div className={styles.bottomGrid}>
        <section className={styles.tip} aria-labelledby="tip-heading">
          <div className={styles.tipHeading}><Lightbulb size={20} aria-hidden="true" /><h2 id="tip-heading">Փոքր քայլ, մեծ օգուտ</h2></div>
          <div className={styles.tipContent} aria-live="polite" aria-atomic="true">
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
          <div className={styles.tipFooter}>
            <span aria-label={`Խորհուրդ ${tipIndex + 1}՝ ${TIPS.length}-ից`}>0{tipIndex + 1} / 0{TIPS.length}</span>
            <button type="button" onClick={() => setTipIndex(index => (index + 1) % TIPS.length)}>
              Հաջորդ խորհուրդը <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className={styles.updates} aria-labelledby="updates-heading">
          <div className={styles.updatesHeading}>
            <h2 id="updates-heading">Ի՞նչ է փոխվել</h2>
            <span>{APP_VERSION}</span>
          </div>
          <p className={styles.updatesIntro}>Փոքր բարելավումներ՝ ավելի հարմար սովորելու համար։</p>
          <div className={styles.updateList}>
            {SITE_UPDATES.slice(0, 3).map(update => (
              <details key={update.id} className={styles.update}>
                <summary>
                  <span><span className={styles.updateSection}>{update.section}</span><span className={styles.updateTitle}>{update.title}</span></span>
                  <ChevronRight size={18} aria-hidden="true" />
                </summary>
                <div className={styles.updateBody}>
                  <p>{update.description}</p>
                  <time dateTime={update.date}>{update.dateLabel}</time>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <footer className={styles.footer}>HayLingo · Քո լեզվով՝ դեպի նոր աշխարհ։</footer>
    </div>
  );
}
