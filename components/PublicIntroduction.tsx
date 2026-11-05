import React from 'react';

/** Shared public content: readable in the initial HTML and after hydration. */
export default function PublicIntroduction() {
  return (
    <section aria-labelledby="public-introduction-title">
      <h1 id="public-introduction-title" className="text-2xl md:text-3xl font-extrabold">
        HayLingo — սովորիր անգլերեն հայերենով
      </h1>
      <p className="mt-3 text-sm md:text-base text-emerald-100 max-w-2xl">
        Անգլերենի անվճար ուսուցում հայախոսների համար՝ հայերեն բացատրություններով,
        թարգմանությամբ և արտասանության հուշումներով։ Սկսիր անգլերեն այբուբենից ու
        առաջին բառերից, ապա անցիր նախադասություններին և առօրյա զրույցներին։
      </p>
      <ul className="mt-4 grid gap-2 text-sm text-emerald-50 md:grid-cols-2">
        <li>Քայլ առ քայլ դասեր և գրավոր վարժություններ։</li>
        <li>Անգլերեն–հայերեն բառարան և կրկնության բառաքարտեր։</li>
        <li>Լսողական պարապմունք և արտասանության փորձարկում։</li>
        <li>Ընթերցանություն, քերականություն և մասնագիտական անգլերեն։</li>
      </ul>
      <p className="mt-3 text-sm text-emerald-100 max-w-2xl">
        Ընտրիր մակարդակդ ու ուսուցման նպատակը։ Առաջընթացդ պահպանվում է սարքում,
        իսկ ավարտած քայլերն օգնում են շարունակել այնտեղից, որտեղ կանգ ես առել։
      </p>
      <p lang="en" className="mt-3 text-sm text-emerald-100 max-w-2xl">
        Learn English for Armenian speakers with HayLingo: guided lessons,
        English–Armenian vocabulary, listening and writing practice.
      </p>
    </section>
  );
}
