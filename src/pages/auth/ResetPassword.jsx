import { useState, useEffect } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Palette,
  Star,
  Shield,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate()

  const [resetData, setResetData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Extract token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl =
      urlParams.get("token") || window.location.pathname.split("/").pop();
    setToken(tokenFromUrl);
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.password !== resetData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (resetData.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("password==>",resetData.password)
    console.log("token==>",token)
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/resetPassword?token=${token}`,
        {
          password: resetData.password,
        }
      );

      if (response.data.success) {
        setIsSubmitted(true);
        console.log("Password reset successfully");
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while resetting your password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login")
  };

  // Password strength validation
  const getPasswordStrength = (password) => {
    if (password.length < 8) return { strength: "weak", color: "red" };
    if (password.length < 12) return { strength: "medium", color: "yellow" };
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password
      )
    ) {
      return { strength: "strong", color: "green" };
    }
    return { strength: "medium", color: "yellow" };
  };

  const passwordStrength = getPasswordStrength(resetData.password);

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
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-60"></div>
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
                      <p className="text-gray-300 text-lg">
                        Premium Art Marketplace
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Shield className="w-6 h-6 text-green-400" />
                        <div className="text-left">
                          <p className="font-semibold">Enhanced Security</p>
                          <p className="text-sm text-gray-300">
                            Strong password protection
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Star className="w-6 h-6 text-yellow-400" />
                        <div className="text-left">
                          <p className="font-semibold">Account Recovery</p>
                          <p className="text-sm text-gray-300">
                            Quick and secure process
                          </p>
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg italic text-gray-300 border-l-4 border-white/30 pl-4">
                      `Where art meets technology in perfect harmony`
                      <footer className="text-sm mt-2 text-gray-400">
                        — ArtKya
                      </footer>
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

                  {!isSubmitted ? (
                    // Reset Password Form
                    <>
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Reset Password
                        </h2>
                        <p className="text-gray-600">
                          Create a new secure password for your account.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600 text-sm">{error}</p>
                          </div>
                        )}

                        {!token && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-700 text-sm">
                              Invalid or missing reset token. Please check your
                              email link.
                            </p>
                          </div>
                        )}

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter new password"
                            value={resetData.password}
                            onChange={(e) => {
                              setResetData({
                                ...resetData,
                                password: e.target.value,
                              });
                              setError(""); // Clear error when user types
                            }}
                            className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              WebkitBoxShadow: "0 0 0 1000px white inset",
                              WebkitTextFillColor: "#111827",
                            }}
                            required
                            disabled={isLoading || !token}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            disabled={isLoading || !token}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {resetData.password && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                Password strength:
                              </span>
                              <span
                                className={`font-medium ${
                                  passwordStrength.color === "red"
                                    ? "text-red-600"
                                    : passwordStrength.color === "yellow"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                              >
                                {passwordStrength.strength
                                  .charAt(0)
                                  .toUpperCase() +
                                  passwordStrength.strength.slice(1)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  passwordStrength.color === "red"
                                    ? "bg-red-500 w-1/3"
                                    : passwordStrength.color === "yellow"
                                    ? "bg-yellow-500 w-2/3"
                                    : "bg-green-500 w-full"
                                }`}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={resetData.confirmPassword}
                            onChange={(e) => {
                              setResetData({
                                ...resetData,
                                confirmPassword: e.target.value,
                              });
                              setError(""); // Clear error when user types
                            }}
                            className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            style={{
                              WebkitBoxShadow: "0 0 0 1000px white inset",
                              WebkitTextFillColor: "#111827",
                            }}
                            required
                            disabled={isLoading || !token}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            disabled={isLoading || !token}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Password Match Indicator */}
                        {resetData.confirmPassword && (
                          <div className="flex items-center space-x-2 text-sm">
                            {resetData.password ===
                            resetData.confirmPassword ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">
                                  Passwords match
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="w-4 h-4 rounded-full border-2 border-red-500"></div>
                                <span className="text-red-600">{`Passwords don't match`}</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Password Requirements */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Password requirements:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li
                              className={`flex items-center ${
                                resetData.password.length >= 8
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                  resetData.password.length >= 8
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              At least 8 characters
                            </li>
                            <li
                              className={`flex items-center ${
                                /[A-Z]/.test(resetData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                  /[A-Z]/.test(resetData.password)
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              One uppercase letter
                            </li>
                            <li
                              className={`flex items-center ${
                                /[a-z]/.test(resetData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                  /[a-z]/.test(resetData.password)
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              One lowercase letter
                            </li>
                            <li
                              className={`flex items-center ${
                                /\d/.test(resetData.password)
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                  /\d/.test(resetData.password)
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              One number
                            </li>
                          </ul>
                        </div>

                        <button
                          onClick={handleResetPassword}
                          disabled={
                            !resetData.password ||
                            !resetData.confirmPassword ||
                            resetData.password !== resetData.confirmPassword ||
                            isLoading ||
                            !token
                          }
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold flex items-center justify-center group text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Resetting Password...
                            </div>
                          ) : (
                            <>
                              Reset Password
                              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </>
                          )}
                        </button>

                        <div className="text-center">
                          <button
                            onClick={handleBackToLogin}
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          >
                            Back to Login
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Success Message
                    <>
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Password Updated!
                        </h2>
                        <p className="text-gray-600">
                          Your password has been successfully updated. You can
                          now log in with your new password.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={handleBackToLogin}
                          className="w-full bg-gray-900 text-white py-4 px-4 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all duration-200 font-semibold text-lg"
                        >
                          Continue to Login
                        </button>

                        <div className="text-center pt-4">
                          <p className="text-sm text-gray-500">
                            {`Keep your password safe and don't share it with anyone.`}
                          </p>
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

export default ResetPasswordPage;
