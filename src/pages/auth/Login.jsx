/* eslint-disable react/jsx-no-duplicate-props */
import  { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Palette, Star, Shield } from 'lucide-react';
import { useDispatch, } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import LoginImage from "../../assets/LoginImage.jpg";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for tab switching
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Login state (keeping your original functionality)
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // Register state (keeping your original functionality)
  const [userRegister, setUserRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Your original login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const loginPayload = {
      email: userLogin?.email,
      password: userLogin?.password,
    };

    dispatch({
      type: "LOGIN",
      payload: {
        body: loginPayload,
        navigate,
      },
    });
  };

  // Your original register handler
  const addUserHandler = (e) => {
    e.preventDefault();
    const payload = {
      firstName: userRegister?.firstName,
      lastName: userRegister?.lastName,
      email: userRegister?.email,
      password: userRegister?.password,
    };
    dispatch({
      type: "REGISTER",
      payload: {
        body: payload,
      },
    });

    setUserRegister({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  // Handle tab switching with smooth transition
  const handleTabSwitch = (loginMode) => {
    setIsLogin(loginMode);
    // Reset forms when switching
    if (loginMode) {
      setUserRegister({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else {
      setUserLogin({
        email: "",
        password: "",
      });
    }
    setIsPasswordVisible(false);
  };

  return (
    <div>
      <Header className="fixed z-10 bg-black header" />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex min-h-[600px]">
              {/* Left Panel - Image Section */}
              <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={LoginImage}
                    alt="Art Gallery"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
                </div>

                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-40 right-16 w-24 h-24 border border-white/10 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rounded-full animate-ping"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
                  <div className="text-center max-w-md">
                    <div className="mb-8">
                      <Palette className="w-16 h-16 mx-auto mb-4 text-white" />
                      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        ArtKya
                      </h1>
                      <p className="text-gray-300 text-lg">Premium Art Marketplace</p>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Star className="w-6 h-6 text-yellow-400" />
                        <div className="text-left">
                          <p className="font-semibold">Curated Collections</p>
                          <p className="text-sm text-gray-300">Hand-picked masterpieces</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Shield className="w-6 h-6 text-green-400" />
                        <div className="text-left">
                          <p className="font-semibold">Secure Transactions</p>
                          <p className="text-sm text-gray-300">Protected & verified sales</p>
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg italic text-gray-300 border-l-4 border-white/30 pl-4">
                     {` "Where art meets technology in perfect harmony."`}
                      <footer className="text-sm mt-2 text-gray-400">— ArtKya</footer>
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form Section */}
              <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                  {/* Mobile Logo */}
                  <div className="lg:hidden text-center mb-8">
                    <Palette className="w-12 h-12 mx-auto mb-3 text-gray-900" />
                    <h1 className="text-2xl font-bold text-gray-900">ArtKya</h1>
                  </div>

                  {/* Clean Toggle Buttons like the image */}
                  <div className="flex gap-3 mb-8">
                    <button
                      onClick={() => handleTabSwitch(true)}
                      className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                        isLogin
                          ? 'bg-black text-white'
                          : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleTabSwitch(false)}
                      className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                        !isLogin
                          ? 'bg-black text-white'
                          : 'bg-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Form Container with Smooth Transition */}
                  <div className="relative overflow-hidden">
                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute inset-0'
                      }`}
                    >
                      {/* LOGIN FORM */}
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                      </div>

                      <div className="space-y-6">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={userLogin.email}
                            onChange={(e) => {
                              setUserLogin({ ...userLogin, email: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 autofill:bg-white autofill:text-gray-900"
                            style={{
                              WebkitBoxShadow: '0 0 0 1000px white inset',
                              WebkitTextFillColor: '#111827'
                            }}
                          />
                        </div>

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={userLogin.password}
                            onChange={(e) => {
                              setUserLogin({ ...userLogin, password: e.target.value });
                            }}
                            className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              WebkitBoxShadow: '0 0 0 1000px white inset',
                              WebkitTextFillColor: '#111827'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                          </label>
                          <Link to="/forgotpassword" className="text-sm text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200">
                            Forgot password?
                          </Link>
                        </div>

                        <button
                          onClick={handleLogin}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold flex items-center justify-center group text-lg"
                        >
                          LOGIN
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>

                        {/* Social Login Buttons - Commented out for now */}
                        {/*
                        <div className="space-y-3">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500 font-medium">OR</span>
                            </div>
                          </div>

                          <button className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium">
                            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                            <span>Continue with Facebook</span>
                          </button>

                          <button className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-xl transition-all duration-200 font-medium">
                            <img src={googleIcon} alt="Google" className="w-5 h-5" />
                            <span>Continue with Google</span>
                          </button>
                        </div>
                        */}

                        <p className="text-center text-gray-600">
                        {`  Don't have an account?`}
                          <button
                            onClick={() => handleTabSwitch(false)}
                            className="text-gray-900 hover:text-gray-700 font-semibold transition-colors duration-200"
                          >
                            Register here
                          </button>
                        </p>
                      </div>
                    </div>

                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        !isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute inset-0'
                      }`}
                    >
                      {/* REGISTER FORM */}
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
                        <p className="text-gray-600">Join our community of art enthusiasts</p>
                      </div>

                      <div className="space-y-6">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={userRegister.firstName}
                            onChange={(e) => {
                              setUserRegister({ ...userRegister, firstName: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            // style={{
                            //   WebkitBoxShadow: '0 0 0 1000px white inset',
                            //   WebkitTextFillColor: '#111827'
                            // }}
                            // style={{
                            //   WebkitBoxShadow: '0 0 0 1000px white inset',
                            //   WebkitTextFillColor: '#111827'
                            // }}
                            // style={{
                            //   WebkitBoxShadow: '0 0 0 1000px white inset',
                            //   WebkitTextFillColor: '#111827'
                            // }}
                            // style={{
                            //   WebkitBoxShadow: '0 0 0 1000px white inset',
                            //   WebkitTextFillColor: '#111827'
                            // }}
                          />
                        </div>

                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={userRegister.lastName}
                            onChange={(e) => {
                              setUserRegister({ ...userRegister, lastName: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                          />
                        </div>

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={userRegister.email}
                            onChange={(e) => {
                              setUserRegister({ ...userRegister, email: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                          />
                        </div>

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="password"
                            name="password"
                            placeholder="Create your password"
                            value={userRegister.password}
                            onChange={(e) => {
                              setUserRegister({ ...userRegister, password: e.target.value });
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                          />
                        </div>

                        <button
                          onClick={addUserHandler}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold flex items-center justify-center group text-lg"
                        >
                          CREATE ACCOUNT
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>

                        {/* Social Login Buttons - Commented out for now */}
                        {/*
                        <div className="space-y-3">
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500 font-medium">OR</span>
                            </div>
                          </div>

                          <button className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium">
                            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                            <span>Continue with Facebook</span>
                          </button>

                          <button className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 py-3 px-4 rounded-xl transition-all duration-200 font-medium">
                            <img src={googleIcon} alt="Google" className="w-5 h-5" />
                            <span>Continue with Google</span>
                          </button>
                        </div>
                        */}

                        <p className="text-center text-gray-600">
                          Already have an account?{' '}
                          <button
                            onClick={() => handleTabSwitch(true)}
                            className="text-gray-900 hover:text-gray-700 font-semibold transition-colors duration-200"
                          >
                            Login here
                          </button>
                        </p>

                        <p className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
                          By creating an account, you agree to our{' '}
                          <a href="#" className="text-gray-900 hover:text-gray-700 underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-gray-900 hover:text-gray-700 underline">Privacy Policy</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;