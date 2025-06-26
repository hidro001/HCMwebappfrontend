import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { setPasswordRequest } from '../../service/registrationService';

export default function SetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return toast.error('Passwords must match and be at least 6 characters.');
    }

    setLoading(true);
    const result = await setPasswordRequest(token, password);
    setLoading(false);

    if (result.success) {
      toast.success('Password set successfully!');
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <Toaster
        toastOptions={{
          className: 'text-gray-900 dark:text-white bg-white dark:bg-gray-900 border dark:border-gray-700',
          style: {
            zIndex: 9999999,
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
      />

      <img
        src="https://humanmaximizer.com/assets/img/hcm-images/hcm-logo.png"
        alt="Logo"
        className="w-20 h-20 md:w-24 md:h-24 mb-6"
      />

      {isSuccess ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 text-center max-w-md w-full">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200">Thank You!</h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
            Your password has been set successfully. You will be redirected shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 max-w-md w-full"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-6">
            Set Your Password
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full py-2 px-4 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full py-2 px-4 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
                disabled={loading}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded text-white font-medium transition ${
              loading || !isFormValid
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Setting Password...
              </>
            ) : (
              'Set Password'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
