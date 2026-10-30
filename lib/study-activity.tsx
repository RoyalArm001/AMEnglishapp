'use client';
import {createContext, useContext} from 'react';
// Views announce user-initiated practice; automatic audio playback does not start a session.
export const StudyActivityContext = createContext({start: () => {}, finish: () => {}});
export const useStudyActivity = () => useContext(StudyActivityContext);
