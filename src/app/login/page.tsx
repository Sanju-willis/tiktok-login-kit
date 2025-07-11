// src\app\login\page.tsx
'use client'

export default function TikTokLoginPage() {
  const handleLogin = () => {
    const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!);
    const scope = 'user.info.basic';

    const url = `https://www.tiktok.com/v2/auth/authorize?client_id=${clientKey}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = url;
  };

  return (
    <div style={{ padding: 32 }}>
      <button onClick={handleLogin}>Login with TikTok</button>
    </div>
  );
}
