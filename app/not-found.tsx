import Link from 'next/link';
import Logo from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-center space-y-6">
      <Logo size="lg" />
      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="text-xl font-bold">Էջը չի գտնվել</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Ձեր փնտրած էջը տեղափոխվել է կամ գոյություն չունի։ Կարող եք վերադառնալ գլխավոր վահանակ։
        </p>
      </div>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
      >
        Վերադառնալ գլխավոր էջ
      </Link>
    </div>
  );
}

