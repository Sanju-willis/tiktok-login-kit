// src\pages\api\auth\tiktok\callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('Missing code');

  try {
    const result = await axios.post(
      'https://open.tiktokapis.com/v2/oauth/token/',
      qs.stringify({
        client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, open_id } = result.data;

    res.status(200).json({ message: 'Login success', open_id, access_token });
 } catch (err) {
  const error = err as { response?: { data?: unknown }; message?: string };
  console.error('[TikTok Callback Error]', error.response?.data || error.message);
  res.status(500).json({ error: 'TikTok token exchange failed' });
}


}
