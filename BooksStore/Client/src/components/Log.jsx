import React, { useState } from 'react';
import { GiCrossedAxes } from "react-icons/gi";
import api from '../config/api';
import { useNavigate } from 'react-router-dom';

const Log = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        occupation: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        occupation: "",
        password: ""
    });

    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };


    
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            fullName: "",
            email: "",
            occupation: "",
            password: "",
            form: ""
        };

        // Common validations for both login and signup
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        // Signup specific validations
        if (isSignUp) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = "Full name is required";
                valid = false;
            }
            if (!formData.occupation) {
                newErrors.occupation = "Please select an occupation";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({
            fullName: "",
            email: "",
            occupation: "",
            password: ""
        });

        const endpoint = isSignUp ? "register" : "login";
        const payload = isSignUp ? formData : {
            email: formData.email,
            password: formData.password
        };

        try {
            const res = await api.post(`/user/${endpoint}`, payload);
            
            setFormData({
                fullName: "",
                email: "",
                occupation: "",
                password: ""
            });

            if (!isSignUp && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
            }

            setIsSignUp(prev => !prev);
            onClose();

        } catch (error) {
            const errorMsg = error.response?.data?.message || 
                           "An error occurred. Please try again.";
            setErrors(prev => ({ ...prev, form: errorMsg }));
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp(prev => !prev);
        setFormData({
            fullName: "",
            email: "",
            occupation: "",
            password: ""
        });
        setErrors({
            fullName: "",
            email: "",
            occupation: "",
            password: ""
        });
    };

    if (!isOpen) return null;

    return (
        <div className='inset-0 fixed bg-black/40 z-50 flex justify-center items-center'>
            <div className='h-[75vh] w-[90vw] md:w-[50vw] bg-white rounded-lg overflow-y-auto'>
                <div className='flex justify-between p-5 font-medium text-indigo-900 sticky top-0 bg-white'>
                    <div className='text-2xl'>{isSignUp ? "Sign Up" : "Log In"}</div>
                    <button 
                        onClick={onClose} 
                        aria-label="Close"
                        disabled={isLoading}
                    >
                        <GiCrossedAxes className='text-3xl hover:text-red-500 transition-colors' />
                    </button>
                </div>

                <form onSubmit={handleOnSubmit}>
                    <div className="flex flex-col justify-center w-full items-center p-5">
                        <div className='flex flex-col gap-6 w-full max-w-md'>
                            {errors.form && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {errors.form}
                                </div>
                            )}

                            {isSignUp && (
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="fullName" className='text-lg'>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        placeholder='Enter Your Full Name'
                                        className={`border outline-none p-2 rounded-lg hover:border-green-600 focus:border-green-600 transition-colors ${
                                            errors.fullName ? 'border-red-500' : ''
                                        }`}
                                        onChange={handleOnChange}
                                        disabled={isLoading}
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm">{errors.fullName}</p>
                                    )}
                                </div>
                            )}

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='text-lg'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    placeholder='Enter Your Email'
                                    className={`border outline-none p-2 rounded-lg hover:border-green-600 focus:border-green-600 transition-colors ${
                                        errors.email ? 'border-red-500' : ''
                                    }`}
                                    onChange={handleOnChange}
                                    required
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email}</p>
                                )}
                            </div>

                            {isSignUp && (
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="occupation" className='text-lg'>Occupation</label>
                                    <select
                                        name="occupation"
                                        id="occupation"
                                        value={formData.occupation}
                                        className={`border outline-none p-2 rounded-lg hover:border-green-600 focus:border-green-600 transition-colors ${
                                            errors.occupation ? 'border-red-500' : ''
                                        }`}
                                        onChange={handleOnChange}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Occupation</option>
                                        <option value="Student">Student</option>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.occupation && (
                                        <p className="text-red-500 text-sm">{errors.occupation}</p>
                                    )}
                                </div>
                            )}

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="password" className='text-lg'>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder='Enter Your Password'
                                    className={`border outline-none p-2 rounded-lg hover:border-green-600 focus:border-green-600 transition-colors ${
                                        errors.password ? 'border-red-500' : ''
                                    }`}
                                    onChange={handleOnChange}
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>

                            <button
                                className={`px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mt-4 flex justify-center items-center ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    isSignUp ? "Sign Up" : "Log In"
                                )}
                            </button>

                            <div className='text-center mt-2'>
                                <span className='text-gray-600'>
                                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                                </span>
                                <button
                                    type="button"
                                    onClick={toggleAuthMode}
                                    className='ml-2 text-indigo-600 hover:text-indigo-800 font-medium'
                                    disabled={isLoading}
                                >
                                    {isSignUp ? "Log In" : "Sign Up"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Log;