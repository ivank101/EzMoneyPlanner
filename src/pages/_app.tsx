import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Dialog } from 'primereact/dialog';
import '@/styles/reset.min.css';
import { AuthProvider } from '@/context/auth';

import '@/styles/homePage.module.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <style
        jsx
        global
      >{`
        html,
        body {
          color: #545454;
        }
      `}</style>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
