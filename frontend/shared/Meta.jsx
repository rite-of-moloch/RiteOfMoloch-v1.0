import Head from 'next/head';

export const Meta = () => {
  return (
    <>
      <Head>
        <title>Rite of Moloch</title>
        <meta
          name='description'
          content='Stake your RAID & commit to Raidguild Cohort.'
        />
        <meta property='og:title' content='Rite of Moloch' />
        <meta
          property='og:description'
          content='Stake your RAID & commit to Raidguild Cohort.'
        />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
};
