'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SignupForm = { userNm: string; loginId: string; pwd: string; chkPwd: string };

export default function SignupPage() {
    const [form, setForm] = useState<SignupForm>({ userNm: '', loginId: '', pwd: '', chkPwd: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.userNm)  return setError('성명을 입력해주세요.');
        if (!form.loginId) return setError('아이디를 입력해주세요.');
        if (!form.pwd)     return setError('비밀번호를 입력해주세요.');
        if (!form.chkPwd)  return setError('비밀번호 확인을 입력해주세요.');
        if (form.pwd !== form.chkPwd) return setError('비밀번호가 일치하지 않습니다.');

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const text = await res.text();
            if (res.ok) { alert(text); router.push('/login'); }
            else setError(text);
        } catch {
            setError('서버에 연결할 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>

            {/* 브랜드 패널 */}
            <div className="auth-brand" style={brandStyle}>
                <div style={{ padding: '48px', position: 'relative', zIndex: 1 }}>
                    <div style={brandLogo}>◆ LCY</div>
                    <h1 style={brandTitle}>함께 시작해요</h1>
                    <p style={brandDesc}>계정을 만들고<br />모든 기능을 사용해보세요.</p>
                </div>
                <div style={brandCircle1} />
                <div style={brandCircle2} />
            </div>

            {/* 폼 */}
            <div style={formSide}>
                <div style={formCard}>
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#0891b2', fontWeight: 700 }}>◆ LCY</span>
                    </div>
                    <h2 style={formTitle}>회원가입</h2>
                    <p style={formSubtitle}>새 계정 정보를 입력하세요</p>

                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { label: '성명',         name: 'userNm',  type: 'text',     ph: '성명을 입력하세요' },
                            { label: '아이디',       name: 'loginId', type: 'text',     ph: '아이디를 입력하세요' },
                            { label: '비밀번호',     name: 'pwd',     type: 'password', ph: '비밀번호를 입력하세요' },
                            { label: '비밀번호 확인', name: 'chkPwd', type: 'password', ph: '비밀번호를 한 번 더 입력하세요' },
                        ].map(f => (
                            <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{f.label}</label>
                                <input
                                    type={f.type} name={f.name}
                                    value={form[f.name as keyof SignupForm]}
                                    onChange={handleChange} placeholder={f.ph}
                                    style={inputStyle}
                                    autoFocus={f.name === 'userNm'}
                                />
                            </div>
                        ))}

                        {error && <div style={errorStyle}>{error}</div>}

                        <button type="submit" disabled={loading} style={submitBtn(loading)}>
                            {loading ? '가입 중...' : '회원가입'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>이미 계정이 있으신가요? </span>
                        <Link href="/login" style={{ fontSize: '13px', color: '#0891b2', fontWeight: 600, textDecoration: 'none' }}>
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const brandStyle: React.CSSProperties = {
    flex: '0 0 420px',
    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
};

const brandLogo: React.CSSProperties = {
    fontSize: '20px', fontWeight: 800, color: 'rgba(255,255,255,0.95)',
    marginBottom: '48px', letterSpacing: '-0.02em',
};
const brandTitle: React.CSSProperties = {
    fontSize: '34px', fontWeight: 800, color: '#fff',
    lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.02em',
};
const brandDesc: React.CSSProperties = {
    fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0,
};
const brandCircle1: React.CSSProperties = {
    position: 'absolute', bottom: '-80px', right: '-80px',
    width: '300px', height: '300px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.06)',
};
const brandCircle2: React.CSSProperties = {
    position: 'absolute', top: '-60px', left: '-60px',
    width: '200px', height: '200px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.04)',
};
const formSide: React.CSSProperties = {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '32px 24px',
};
const formCard: React.CSSProperties = {
    width: '100%', maxWidth: '400px',
};
const formTitle: React.CSSProperties = {
    fontSize: '26px', fontWeight: 800, color: '#0f172a',
    margin: '0 0 4px', letterSpacing: '-0.02em',
};
const formSubtitle: React.CSSProperties = {
    fontSize: '14px', color: '#94a3b8', margin: '0 0 24px',
};
const inputStyle: React.CSSProperties = {
    padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #e2e8f0', fontSize: '14px',
    color: '#0f172a', backgroundColor: '#fff',
    transition: 'border-color 0.15s, box-shadow 0.15s', width: '100%',
};
const errorStyle: React.CSSProperties = {
    padding: '10px 14px', borderRadius: '8px',
    backgroundColor: '#fef2f2', border: '1px solid #fecaca',
    color: '#ef4444', fontSize: '13px',
};
const submitBtn = (loading: boolean): React.CSSProperties => ({
    padding: '13px', borderRadius: '10px', border: 'none',
    backgroundColor: loading ? '#67e8f9' : '#0891b2', color: '#fff',
    fontSize: '14px', fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '4px', width: '100%',
});
