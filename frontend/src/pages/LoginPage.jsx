import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulated API call (replace with actual axios/fetch call to /api/auth/login)
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: formData.identifier, password: formData.password })
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials.');
            }

            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);

            // Redirect based on role
            if (data.role === 'student') navigate('/student-dashboard');
            else if (data.role === 'owner') navigate('/owner-dashboard');
            else if (data.role === 'admin') navigate('/admin-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100">
                
                {/* Header & Logo */}
                <div className="flex flex-col items-center">
                    <img
                        className="h-10 w-auto mb-6"
                        src="/MOV Stay Logo.png"
                        alt="MOV Stay Logo"
                    />
                    <h2 className="text-center text-3xl font-bold tracking-tight text-[#0F172A]">
                        Welcome back
                    </h2>
                    <p className="mt-3 text-center text-sm text-[#475569]">
                        Enter your credentials to access your account.
                    </p>
                </div>

                {/* Form Elements */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Identifier (Email/Phone) */}
                        <div>
                            <label className="block tracking-wide text-sm font-medium text-[#334155] mb-2">
                                Email or Phone Number
                            </label>
                            <input
                                name="identifier"
                                type="text"
                                required
                                value={formData.identifier}
                                onChange={handleChange}
                                className="block w-full px-4 py-3.5 rounded-xl border-gray-200 text-[#1E293B] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors sm:text-sm shadow-sm outline-none"
                                placeholder="Enter your email or phone"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block tracking-wide text-sm font-medium text-[#334155] mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full px-4 py-3.5 rounded-xl border-gray-200 text-[#1E293B] bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors sm:text-sm shadow-sm outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Meta actions (Remember Me & Forgot Pass) */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#475569] cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative flex w-full justify-center rounded-xl border border-transparent bg-[#0F172A] py-3.5 px-4 text-sm font-semibold text-white shadow-md hover:bg-[#1E293B] hover:shadow-lg transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* Registration Links */}
                    <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col space-y-3">
                        <p className="text-center text-sm text-[#475569]">
                            Don't have an account?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/register-student" className="text-center w-full py-2.5 px-4 bg-teal-50 text-teal-700 font-semibold rounded-xl text-sm border border-teal-100 hover:bg-teal-100 transition-colors">
                                Register as Student
                            </Link>
                            <Link to="/register-owner" className="text-center w-full py-2.5 px-4 bg-blue-50 text-blue-700 font-semibold rounded-xl text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
                                Register as Owner
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
