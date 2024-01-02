import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { token, newPassword } = req.body;

      // Replace with the URL of your Elixir/Phoenix endpoint for password reset
      const backendUrl = 'https://api.pidro.online/v2/set_new_password';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        // Password reset successful
        res.status(200).json({ message: 'Password successfully reset.' });
      } else {
        // Backend responded with an error
        const errorData = await response.json();
        res.status(response.status).json({ message: errorData.message || 'Error resetting password.' });
      }
    } catch (error) {
      // Server error
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
