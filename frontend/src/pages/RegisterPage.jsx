import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine initial role from URL if navigated from Login links (e.g. /register-student)
    const initialRole = location.pathname.includes('owner') ? 'owner' : 'student';
    const [role, setRole] = useState(initialRole);
    
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
        // Student specific
        college: '', preferredCity: '', budgetRange: '',
        // Owner specific
        propertyType: 'PG', city: '', numberOfRooms: '',
        // General
        agreeTerms: false
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

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters long');
        }
        if (!formData.agreeTerms) {
            return setError('You must agree to the Terms and Conditions');
        }

        setIsLoading(true);

        const endpoint = role === 'student' ? '/api/auth/register-student' : '/api/auth/register-owner';
        
        // Prepare payload based on role to send only required data
        const payload = role === 'student' ? {
            name: formData.name, email: formData.email, phone: formData.phone, password: formData.password,
            college: formData.college, preferredCity: formData.preferredCity, budgetRange: formData.budgetRange
        } : {
            name: formData.name, email: formData.email, phone: formData.phone, password: formData.password,
            propertyType: formData.propertyType, city: formData.city, numberOfRooms: formData.numberOfRooms
        };

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store token and redirect
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);
            
            navigate(data.role === 'student' ? '/student-dashboard' : '/owner-dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 my-8">
                
                {/* Header & Logo */}
                <div className="flex flex-col items-center">
                    <img className="h-10 w-auto mb-6" src="/MOV Stay Logo.png" alt="MOV Stay Logo" />
                    <h2 className="text-center text-3xl font-bold tracking-tight text-[#0F172A]">
                        Create your account
                    </h2>
                    <p className="mt-3 text-center text-sm text-[#475569]">
                        Join MOV Stay to discover or list premium accommodations.
                    </p>
                </div>

                {/* Role Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-xl max-w-sm mx-auto mt-6">
                    <button 
                        type="button"
                        onClick={() => setRole('student')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Student
                    </button>
                    <button 
                        type="button"
                        onClick={() => setRole('owner')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'owner' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Property Owner
                    </button>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Common Fields */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#334155] mb-1">Full Name *</label>
                            <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="John Doe" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#334155] mb-1">Email Address *</label>
                            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#334155] mb-1">Phone Number *</label>
                            <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="+91 9876543210" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#334155] mb-1">Password *</label>
                            <input name="password" type="password" required minLength={6} value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#334155] mb-1">Confirm Password *</label>
                            <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="••••••••" />
                        </div>

                        <div className="md:col-span-2 my-2 border-t border-gray-100"></div>

                        {/* Student Specific Fields */}
                        {role === 'student' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[#334155] mb-1">College / University</label>
                                    <input name="college" type="text" value={formData.college} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Optional" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#334155] mb-1">Preferred City</label>
                                    <input name="preferredCity" type="text" value={formData.preferredCity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Optional" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[#334155] mb-1">Budget Range (Monthly)</label>
                                    <input name="budgetRange" type="text" value={formData.budgetRange} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="e.g. ₹5000 - ₹8000" />
                                </div>
                            </>
                        )}

                        {/* Owner Specific Fields */}
                        {role === 'owner' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[#334155] mb-1">Property Type *</label>
                                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none text-[#1E293B]">
                                        <option value="PG">PG</option>
                                        <option value="Hostel">Hostel</option>
                                        <option value="Apartment">Apartment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#334155] mb-1">City / Location *</label>
                                    <input name="city" type="text" required value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Property check city" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[#334155] mb-1">Number of Rooms</label>
                                    <input name="numberOfRooms" type="number" min="0" value={formData.numberOfRooms} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Optional" />
                                </div>
                            </>
                        )}

                    </div>

                    {/* Terms & Submit */}
                    <div className="flex items-center mt-6">
                        <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} required className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer" />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-[#475569] cursor-pointer">
                            I agree to the <span className="font-semibold text-teal-600">Terms and Conditions</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-6 w-full flex justify-center py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${role === 'student' ? 'bg-[#0D9488] hover:bg-[#0F766E]' : 'bg-[#0369A1] hover:bg-[#075985]'} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Creating Account...' : `Register as ${role === 'student' ? 'Student' : 'Owner'}`}
                    </button>

                    <p className="text-center text-sm text-[#475569] mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-[#0F172A] hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
