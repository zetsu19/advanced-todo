import { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { ApolloProvider } from './provider/ApolloProvider';

export const metadata: Metadata = {
  title: 'Todo-web',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
