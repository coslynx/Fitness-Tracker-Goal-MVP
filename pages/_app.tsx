import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useStore } from '@/store';

interface MyAppProps extends AppProps {
  session: Session | null;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  useStore.getState(); // Initialize store on app mount

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default MyApp;