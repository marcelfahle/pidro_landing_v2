import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const tokenParam = router.query.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
    console.log('token', token)

    if (token) {
      setToken(token);
      validateToken(token);
    }
  }, [router.query.token]);

  const validateToken = async (token: string) => {
    const response = await fetch('/api/validate-reset-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    setIsValidToken(data.valid);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        // Handle successful password reset (e.g., redirect to login page)
        setIsSuccess(true)
      } else {
        // Handle error
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error resetting password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting the password.');
    }
  };


  if (isSuccess) {
    return <p>Password Reset Successful</p>
  }

  if (!isValidToken) {
    return <p>Invalid or expired token.</p>;
  }

  return (
    <Layout barebones={true}>
      <div className="flex flex-col relative z-50 prose">
        <p className='mb-4 strong'><strong>Here you can set a new password:</strong> </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block">New Password:</label>
            <input
              className="text-black text-xl px-2 py-0.5"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              className="text-black text-xl px-2 py-0.5"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">Reset Password</button>
        </form>
      </div>
    </Layout>
  );
}

