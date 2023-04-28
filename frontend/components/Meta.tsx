import Head from "next/head";

export const Meta = () => {
  return (
    <>
      <Head>
        <title>Rite of Moloch</title>
        <meta
          name="description"
          content="HR for DAOs. Rite of Moloch is a modular staking platform where cohort members can commit to a cohort and build rapport with other members"
        />
        <meta property="og:title" content="Rite of Moloch" />
        <meta
          property="og:description"
          content="HR for DAOs. Rite of Moloch is a modular staking platform where cohort members can commit to a cohort and build rapport with other members"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://www.raidguild.org/_next/static/media/raidguild.f7e2c25d.webp"
        />
      </Head>
    </>
  );
};
