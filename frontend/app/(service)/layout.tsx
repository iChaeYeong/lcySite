'use client';

import Header from '@/components/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="main-container">
            <Header />
            <main style={{ minHeight: 'calc(100vh - 60px)', backgroundColor: '#f1f5f9' }}>
                {children}
            </main>
        </div>
    );
}