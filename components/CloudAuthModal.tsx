'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Lock, Mail, CheckCircle2, AlertCircle, LogOut, RefreshCw, X, ShieldCheck } from 'lucide-react';
import {
  CloudSession,
  getStoredCloudSession,
  cloudRegister,
  cloudLogin,
  cloudLogout,
  cloudSyncPush,
  cloudSyncPull,
} from '../lib/cloud-sync';
import type { UserProgressData } from '../lib/types';

interface CloudAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProgress: UserProgressData;
  onProgressLoadedFromCloud: (progress: UserProgressData) => void;
}

export default function CloudAuthModal({
  isOpen,
  onClose,
  currentProgress,
  onProgressLoadedFromCloud,
}: CloudAuthModalProps) {
  const [session, setSession] = useState<CloudSession | null>(null);
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSession(getStoredCloudSession());
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'register') {
      const res = await cloudRegister(email, password, currentProgress);
      setIsLoading(false);
      if (res.ok && res.session) {
        setSession(res.session);
        setSuccessMessage(res.messageAm || 'Հաջողությամբ գրանցվեցիք և միացաք առցանց բազային։');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(res.errorAm || 'Գրանցման սխալ։');
      }
    } else {
      const res = await cloudLogin(email, password);
      setIsLoading(false);
      if (res.ok && res.session) {
        setSession(res.session);
        setSuccessMessage(res.messageAm || 'Մուտքը հաջողվեց։');
        setEmail('');
        setPassword('');
        if (res.progressData) {
          onProgressLoadedFromCloud(res.progressData);
        }
      } else {
        setErrorMessage(res.errorAm || 'Մուտքի սխալ։');
      }
    }
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const res = await cloudSyncPush(currentProgress);
    setIsLoading(false);
    if (res.ok) {
      setSuccessMessage('✓ Ձեր բոլոր տվյալները հաջողությամբ համաժամեցվեցին MongoDB Atlas-ում։');
      setSession(getStoredCloudSession());
    } else {
      setErrorMessage(res.errorAm || 'Համաժամեցման սխալ։');
    }
  };

  const handlePullCloud = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const res = await cloudSyncPull();
    setIsLoading(false);
    if (res.ok && res.progressData) {
      onProgressLoadedFromCloud(res.progressData);
      setSuccessMessage('✓ Տվյալները հաջողությամբ վերականգնվեցին առցանց բազայից։');
      setSession(getStoredCloudSession());
    } else {
      setErrorMessage(res.errorAm || 'Տվյալների բեռնման սխալ կամ բազայում դեռ տվյալներ չկան։');
    }
  };

  const handleLogout = () => {
    cloudLogout();
    setSession(null);
    setSuccessMessage('Դուրս եկաք առցանց բազայի հաշվից։ Տեղական ուսուցումը շարունակվում է։');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Փակել"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Cloud size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Առցանց Բազա · MongoDB Atlas
            </h2>
            <p className="text-xs text-slate-500">
              Միացիր առցանց բազային՝ առաջընթացդ բոլոր սարքերում պահպանելու համար։
            </p>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* State A: Logged In */}
        {session ? (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={14} /> Ակտիվ Միացում
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  MongoDB Cloud
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {session.email}
              </p>
              {session.lastSyncedAt && (
                <p className="text-[11px] text-slate-500">
                  Վերջին համաժամեցում՝ {new Date(session.lastSyncedAt).toLocaleTimeString('hy-AM', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isLoading}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                Պահպանել ամպում
              </button>

              <button
                type="button"
                onClick={handlePullCloud}
                disabled={isLoading}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                <Cloud size={14} />
                Բեռնել ամպից
              </button>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center justify-center gap-1.5 transition"
            >
              <LogOut size={14} /> Դուրս գալ այս հաշվից
            </button>
          </div>
        ) : (
          /* State B: Short Registration & Login Form */
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Mode Switch Tabs */}
            <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMessage(''); }}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Գրանցում (Նոր հաշիվ)
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Մուտք (Գոյություն ունեցող)
              </button>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Mail className="text-slate-400 w-3.5 h-3.5 shrink-0" />
                <span>Էլ. փոստ (Email)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="orinak@gmail.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Lock className="text-slate-400 w-3.5 h-3.5 shrink-0" />
                <span>Գաղտնաբառ (Password)</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Առնվազն 6 նիշ"
                minLength={6}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-md shadow-emerald-500/20"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Ստուգվում է...
                </>
              ) : mode === 'register' ? (
                'Գրանցվել և միանալ առցանց բազային'
              ) : (
                'Մուտք գործել առցանց բազա'
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              🔒 Տվյալները պահպանվում են անվտանգ MongoDB Atlas ամպում (Salt + SHA-512):
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

