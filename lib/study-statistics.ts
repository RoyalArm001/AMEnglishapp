import { StudySessionRecord } from './types';
import { getDateStringInTimezone } from './i18n';

export function buildStudyChart(history: StudySessionRecord[], range: 'daily'|'weekly'|'monthly', timezone: string, now = new Date()) {
  const today = getDateStringInTimezone(timezone, now);
  const anchor = new Date(`${today}T00:00:00Z`);
  const count = range === 'daily' ? 7 : range === 'weekly' ? 4 : 6;
  return Array.from({length:count},(_,index)=>{
    const offset=count-1-index;
    const start = new Date(anchor), end = new Date(anchor);
    if(range==='monthly') {
      start.setUTCDate(1);start.setUTCMonth(start.getUTCMonth()-offset);
      end.setTime(start.getTime());end.setUTCMonth(end.getUTCMonth()+1);
    } else {
      const days=range==='weekly'?7:1;
      start.setUTCDate(start.getUTCDate()-offset*days-(days-1));
      end.setTime(start.getTime());end.setUTCDate(end.getUTCDate()+days);
    }
    const from=start.toISOString().slice(0,10),to=end.toISOString().slice(0,10);
    const minutes=history.filter(h=>h.date>=from&&h.date<to).reduce((total,h)=>total+Math.max(0,h.durationMinutes||0),0);
    return {label:range==='monthly'?from.slice(0,7):from.slice(5),minutes:Math.round(minutes*10)/10};
  });
}
