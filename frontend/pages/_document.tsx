import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <title>Rite of Moloch</title> */}
        <meta
          name="Rite of Moloch"
          content="Deploy your own instance of a Rite of Moloch contract. Built on BaalV3. Stake to cohorts. Admin priviledges to manage cohorts"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Rubik&family=Space+Mono&family=Texturina:opsz@12..72&family=Uncial+Antiqua&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
