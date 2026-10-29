import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://armeng.royalarm.store'),
  alternates: { canonical: '/' },
  title: 'HayLingo AI — Անգլերենի ինտերակտիվ ուսուցում հայախոսների համար',
  description:
    'Ժամանակակից անգլերենի ուսուցման հարթակ հայախոսների համար՝ 15 բաժիններ, 20+ դասեր, 200+ բառեր, IT English, ձայնային պարապմունք և անձնական AI ուսուցիչ։',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hy" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
