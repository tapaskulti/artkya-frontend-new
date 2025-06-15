import { useState } from 'react';
import { Mail, ArrowRight, Palette, Star, Shield, ArrowLeft } from 'lucide-react';
import axios from 'axios';
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import LoginImage from "../../assets/LoginImage.jpg";

const ForgotPasswordPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/forgotPasswordmail`, {
        email: email
      });

      if (response.data.success) {
        setIsSubmitted(true);
        console.log("Forgot password email sent successfully");
      } else {
        setError(response.data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred while sending the reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post('/api/auth/forgot-password', {
        email: email
      });

      if (response.data.success) {
        console.log("Reset email resent successfully");
        setError(""); // Clear any previous errors
      } else {
        setError(response.data.message || "Failed to resend email");
      }
    } catch (error) {
      console.error("Resend email error:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred while resending the email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <Header className="fixed z-10 bg-black header" /> */}
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex min-h-[600px]">
              {/* Left Panel - Image Section */}
              <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  {/* <img
                    src={LoginImage}
                    alt="Art Gallery"
                    className="w-full h-full object-cover opacity-40"
                  /> */}
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-60"></div>
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
                          <p className="font-semibold">Secure Recovery</p>
                          <p className="text-sm text-gray-300">Protected password reset process</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Shield className="w-6 h-6 text-green-400" />
                        <div className="text-left">
                          <p className="font-semibold">Account Protection</p>
                          <p className="text-sm text-gray-300">Your data remains safe</p>
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg italic text-gray-300 border-l-4 border-white/30 pl-4">
                      "Where art meets technology in perfect harmony."
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

                  {/* Back to Login Link */}
                  <button 
                    onClick={() => console.log("Navigate to login")}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </button>

                  {!isSubmitted ? (
                    // Forgot Password Form
                    <>
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                        <p className="text-gray-600">No worries! Enter your email and we'll send you reset instructions.</p>
                      </div>

                      <div className="space-y-6">
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600 text-sm">{error}</p>
                          </div>
                        )}

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError(""); // Clear error when user types
                            }}
                            className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              WebkitBoxShadow: '0 0 0 1000px white inset',
                              WebkitTextFillColor: '#111827'
                            }}
                            required
                            disabled={isLoading}
                          />
                        </div>

                        <button
                          onClick={handleForgotPassword}
                          disabled={!email || isLoading}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold flex items-center justify-center group text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending...
                            </div>
                          ) : (
                            <>
                              Send Reset Instructions
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </>
                          )}
                        </button>

                        <div className="text-center">
                          <p className="text-gray-600">
                            Remember your password?{' '}
                            <button 
                              onClick={() => console.log("Navigate to login")}
                              className="text-gray-900 hover:text-gray-700 font-semibold transition-colors duration-200"
                            >
                              Back to Login
                            </button>
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Success Message
                    <>
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                        <p className="text-gray-600">
                          We've sent password reset instructions to{' '}
                          <span className="font-semibold text-gray-900">{email}</span>
                        </p>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setError("");
                          }}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold text-lg"
                        >
                          Try Another Email
                        </button>

                        <button
                          onClick={handleResendEmail}
                          disabled={isLoading}
                          className="w-full bg-white border border-gray-300 text-gray-900 py-4 px-4 rounded-xl hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 font-semibold text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                              Resending...
                            </div>
                          ) : (
                            "Resend Email"
                          )}
                        </button>

                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                          </div>
                        )}

                        <div className="text-center pt-4">
                          <p className="text-sm text-gray-500 mb-2">Didn't receive the email? Check your spam folder.</p>
                          <button 
                            onClick={() => console.log("Navigate to login")}
                            className="text-gray-900 hover:text-gray-700 font-semibold transition-colors duration-200"
                          >
                            Back to Login
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;