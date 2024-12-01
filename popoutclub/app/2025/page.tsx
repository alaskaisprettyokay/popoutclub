'use client';
import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { signInWithPopup, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Marquee from 'react-fast-marquee';
import { Bayon } from 'next/font/google';

const bayon = Bayon({
  weight: '400',
  subsets: ['latin'],
});

export default function Page2025() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [invitedBy, setInvitedBy] = useState('');
  const [membershipTier, setMembershipTier] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isPasswordValid = sessionStorage.getItem('isPasswordValid');
    if (isPasswordValid !== 'true') {
      router.push('/'); // Redirect to the main page if the password is not valid
    }
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google User:', result.user);
      setUser(result.user);
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, {
          name,
          invitedBy,
          membershipTier,
          email: user.email || null, // Include email if available
        });
        alert('User information saved successfully!');
        
        // Clear the input fields
        setName('');
        setInvitedBy('');
        setMembershipTier('');

        // Redirect to the intentions page
        router.push('/intentions');
      } catch (error) {
        console.error('Error saving user information:', error);
      }
    } else {
      alert('Please log in first.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that accesses `document` or other browser-specific APIs
      // For example:
      // const element = document.getElementById('some-id');
    }
  }, []);

  return (
    <>
      <canvas className="fixed top-0 left-0 w-full h-full -z-10" />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
        <main className="flex flex-col gap-8 row-start-2 items-center max-w-[70%] mx-auto">
          <Marquee gradient={false} speed={30} direction="right">
            <p className="inline-block text-sm font-[family-name:var(--font-geist-mono)] marquee-text">
              awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • 
            </p>
          </Marquee>
          <h1 className={`${bayon.className} text-[7.7rem] text-center mx-auto`}>POP OUT CLUB</h1>
          <button onClick={handleGoogleLogin} className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Sign in with Google
          </button>
          {user && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="px-4 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                value={invitedBy}
                onChange={(e) => setInvitedBy(e.target.value)}
                placeholder="Invited By"
                className="px-4 py-2 border border-gray-300 rounded"
                required
              />
              <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save Information
              </button>
            </form>
          )}
          {user && <p className="mt-4 text-lg">Logged in as: {typeof user === 'string' ? user : user.email}</p>}
        </main>
      </div>
    </>
  );
}
