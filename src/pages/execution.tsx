// pages/execution.tsx

import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/navigation';
import Chatbot from '@/components/Chatbot';
import styles from '@/styles/execution.module.css';

const pageTitle = 'Chatbot';

const Execution: React.FC = () => {
  const apiKey = 'AIzaSyC25pboEl70KRlajHMLcty3WuQ31qk3Ps8';

  return (
    <Navigation title={pageTitle}>
      <Head>
        <title>Chatbot App</title>
        <meta
          name={pageTitle}
          content=""
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main>
        <Chatbot apiKey={apiKey} />
      </main>
    </Navigation>
  );
};

export default Execution;
