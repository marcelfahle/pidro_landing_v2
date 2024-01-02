import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = req.body.token;
      const response = await fetch('https://api.pidro.online/v2/validate_reset_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      console.log('res', data)
      if (response.ok && data.valid) {
        res.status(200).json({ valid: true });
      } else {
        res.status(200).json({ valid: false, message: 'Invalid or expired token.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while validating the token.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

