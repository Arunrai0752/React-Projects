import React, { useState } from 'react';
import { GiCrossedAxes } from "react-icons/gi";
import api from '../config/api';
import { useNavigate } from 'react-router-dom';


const Log = ({ isOpen, onClose , defaultSignUp = false }) => {
    // page navigate krne ke liye
    const navigate = useNavigate();  

    // Page define krne ke liye hai ki signUp ka page hai ya nhi if true signup hai nhito login
    const [isSignUp, setIsSignUp] = useState(defaultSignUp);


    //SignUp or login Form ka data fill krwa rhe hai uska Data setFormData se FormData me Set Ho rha hai 
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        occupation: "",
        password: ""
    });


    //  isse normal ye false rhega or hame jab bhi kisi buttton ko loding me lagana hoga toh isko true kr denge or jab kaam hone par hatana hoga toh false
    const [isLoading, setIsLoading] = useState(false);

    //jab bhi error aane ka hoga toh isme set error me fill hio jayega fir neeche html me hum check krenge kiisme se koi available hai kya or agar available hoga toh erroe denge
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        occupation: "",
        password: ""
    });

    //  isme htm me onChange par baar baar ye funcltion call hoga or harfield ka data uske name se milte hue setformdata ke variable me fill krega 
    //  second me if agar koi erroe hai toh usko empty string se replase kr rh9 hai
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };


    //  Ye andhar batata hun kya ho rha hai
    const validateForm = () => {

        // agar kahi bhi mistake hoti hai toh ek banda rhega pakadne ke liye ye checker hai
        let valid = true;

        // ?ye collector hai ye collect krega sabhi galtiyon ko
        const newErrors = {
            fullName: "",
            email: "",
            occupation: "",
            password: "",
            form: ""
        };


        // phle check krenge vo fields jo commen hai login me or signup me Email 
        // / ye check kr rha hai ki email me koi reges ki glti ya empty fields hai kya agar hai toh Collector ko dedo
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }
        

        // Ab Specialy Login bhi included hai 
        
        if (isSignUp) {

            // agar isme koi galti hogi toh collector lwe lega jese field khali hona 
            if (!formData.fullName.trim()) {
                newErrors.fullName = "Full name is required";
                valid = false;
            }
            if (!formData.occupation) {
                newErrors.occupation = "Please select an occupation";
                valid = false;
            }
        }

        // ab ye collector  sara data seterror ko dega jo error me ye data jake daal dega or Agar error ki koi bhi field Full hai ya fill hai toh neeche HTMl wale section me ye checke check krega ki kisike pass data hai toh
        //  error do lekin directly nhi jab ye function call hoga tab oir ye function call hoga submit ke time  
        setErrors(newErrors);
        return valid;
    };


    //  isme chalo andhar 
    const handleOnSubmit = async (e) => {

    // yaha form ke default reloader ko roka gaya ruka bhaiya 
        e.preventDefault();


        // fir valedateform ko check kiya gya (valid function yaad hai na sabhi field check hoge aghar ek bhi galat hui false aayega or yahise return hoga )
        // or eoor fileld jese hi fill hui Error samne aa jaega 
        if (!validateForm()) {
            return;
        }

        // Agar form valid hai toh loading true kr denge jisse sabhi field disable ho jaegi or user ka controll nhi rhega 
        setIsLoading(true);
        // Error filelds ko  khali kr liya kisse koi bhi purana error tang na kre 
        setErrors({
            fullName: "",
            email: "",
            occupation: "",
            password: ""
        });


        //  yaha ho ye rha hai ki agar issignup true hua toh signUp wala kaam ho mhi toh Login Wala if else endpoint me string jaehgi
        // SignUp ke liye Register or login ke liye login jisse me aange url li field page ke hisaab se bnau agar usser ne signup kiya toh call hoga url /user/register nhito /user/login
        const endpoint = isSignUp ? "register" : "login";

        // yahase  data utha rhe hai agar user ne signUp par kaam kiya toh sigup ka nhitoh Login ka 
        const payload = isSignUp ? formData : {
            email: formData.email,
            password: formData.password
        };


        // ?Yaha hoga Asli kaam 
        try {
            // Yaha signUp or Login Ka url bneha ki bakend me kaha jana hai or konsa data leke jana hai res me or uske jesa output mylb res aayega 
            // ?res m da chese bheji mene jese message or data
            // bakend me mene cookies me jstoken bhej diya with time 

            const res = await api.post(`/user/${endpoint}`, payload);

            // or yaha par form ko clear krdiya
            setFormData({
                fullName: "",
                email: "",
                occupation: "",
                password: ""
            });


            // ?isme Agart signUp page  tha toh login ho jaega 
            // Or Agar login Page tha toh navigate ho jaega or page close 
          
            // if(isSignUp){
            //       setIsSignUp(false);
            //       return;
            // }

            
           navigate("/")
           window.location.reload()
           onClose()

        } catch (error) {
            // ye jab hoga tab koi erro aayega or error form error,form me aa jaeaga
            const errorMsg = error.response?.data?.message || 
                           "An error occurred. Please try again.";
            setErrors(prev => ({ ...prev, form: errorMsg }));
        } finally {

            //  Yaha Finalyy loading bnd ho jaegi useer Access the field
            setIsLoading(false);
        }
    };


//    Yaha esa hai ki Neeche Signup or Lohin Page ko toggle krne ke liye ye function banaya hai jisse agar login hai toh button apar click krne par ye function call hoga or page change 

// Agar pAge change toh Data GAya purane page ka oR Error Bhi
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

    // Agar is ope True Hoga tabhi page popup karega nhito page Gayab 
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
