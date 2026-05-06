'use client';

import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1A1A1A', // var(--mv-ink)
            color: '#F8F5F2',      // var(--mv-cream)
            borderRadius: '12px',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: '600',
            padding: '12px 24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.05)',
          },
          success: {
            iconTheme: {
              primary: '#8BA18E', // var(--mv-sage)
              secondary: '#F8F5F2',
            },
          },
          error: {
            iconTheme: {
              primary: '#C19A6B', // var(--mv-gold)
              secondary: '#F8F5F2',
            },
          },
        }}
      />
    </>
  );
}
