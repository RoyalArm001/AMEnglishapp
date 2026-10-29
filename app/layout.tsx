import './globals.css';
import type { Metadata, Viewport } from 'next';

const SITE_URL = 'https://armeng.royalarm.uk';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HayLingo — Անգլերենի Ինտերակտիվ Ուսուցում Հայախոսների Համար (A1–C2)',
    template: '%s | HayLingo',
  },
  description:
    'Սովորեք անգլերեն արագ և արդյունավետ հայերեն բացատրություններով ու տառադարձմամբ։ 16 բաժին, 26 դաս, 210+ բառ (Spaced Repetition), 108 ինտերակտիվ վարժություն, 15 մասնագիտական ուղի (IT Specialist, Doctor, Driver և այլն), ձայնային պարապմունք և ուսումնական օգնական։ Աշխատում է նաև Offline (PWA)։',
  applicationName: 'HayLingo',
  authors: [{ name: 'RoyalArm', url: SITE_URL }],
  creator: 'RoyalArm',
  publisher: 'RoyalArm',
  category: 'education',
  classification: 'Education / Language Learning / PWA',
  keywords: [
    'անգլերենի ուսուցում',
    'սովորել անգլերեն',
    'անգլերեն հայախոսների համար',
    'անգլերենի դասեր օնլայն',
    'IT անգլերեն',
    'մասնագիտական անգլերեն',
    'անգլերեն բառարան արտասանությամբ',
    'անգլերեն վարժություններ',
    'ձայնային անգլերեն',
    'HayLingo',
    'Learn English for Armenian speakers',
    'Armenian English learning app',
    'IT Specialist English',
    'English speaking practice',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'hy-AM': SITE_URL,
      'en-US': SITE_URL,
    },
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HayLingo',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'hy_AM',
    alternateLocale: ['en_US'],
    url: SITE_URL,
    siteName: 'HayLingo',
    title: 'HayLingo — Անգլերենի Ինտերակտիվ Ուսուցում Հայախոսների Համար',
    description:
      '26 ինտերակտիվ դասեր հայերեն արտասանությամբ, 210+ բառեր, 108 վարժություններ, IT և մասնագիտական անգլերեն, ձայնային ճանաչում և ուսումնական օգնական (v1.1.0 PWA)։',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'HayLingo — Անգլերենի Ինտերակտիվ Ուսուցում Հայախոսների Համար',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HayLingo — Անգլերենի Ինտերակտիվ Ուսուցում Հայախոսների Համար',
    description:
      'Սովորեք անգլերեն հայերեն տառադարձմամբ, ձայնային վարժություններով, 15 մասնագիտական ուղիներով և ուսումնական օգնականով։',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/icons/icon-192.svg'],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'HayLingo',
      alternateName: 'Անգլերենի Ուսուցում Հայախոսների Համար',
      inLanguage: ['hy-AM', 'en-US'],
      description:
        'Ժամանակակից ինտերակտիվ անգլերենի ուսուցման հարթակ հայախոսների համար (A1–C2)։',
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#webapp`,
      name: 'HayLingo',
      url: SITE_URL,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'LanguageLearning',
      operatingSystem: 'All (Web, Android, iOS, Windows, macOS)',
      softwareVersion: '1.1.0',
      inLanguage: ['hy', 'en'],
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '16 ուսուցման բաժին և 26 ինտերակտիվ դասեր հայերեն տառադարձմամբ',
        '15 մասնագիտական ուղիներ (IT Specialist, Doctor, Driver, Student և այլն)',
        '108 ինտերակտիվ վարժություններ (Fill in the blank, Translation, Error Correction, Speaking, Listening)',
        '210+ անգլերեն բառեր՝ Flashcards և Spaced Repetition համակարգով',
        'Ձայնային արտասանություն (TTS) և խոսքի ճանաչում (STT)',
        'Անձնական Ուսումնական օգնական և Առավոտյան Ձայնային Պարապմունք',
        'Լիարժեք Offline PWA և IndexedDB v3 լոկալ տվյալների բազա',
      ],
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course`,
      name: 'Անգլերենի Ինտերակտիվ Դասընթաց Հայախոսների Համար (A1–C2)',
      description:
        'Անգլերենի ինքնուրույն և արագ ուսուցման դասընթաց՝ հայերեն արտասանությամբ, քերականությամբ, մասնագիտական երկխոսություններով և ձայնային պարապմունքով։',
      provider: {
        '@type': 'Organization',
        name: 'HayLingo',
        sameAs: SITE_URL,
      },
      educationalLevel: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      availableLanguage: ['hy', 'en'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hy" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
