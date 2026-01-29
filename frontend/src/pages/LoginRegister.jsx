import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";

import authApi from "../utils/authApi";

const LoginRegister = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, login, loading } = useUser();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.toDashboard();
    }
  }, [router, user, loading]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setSubmitting(false);
          return;
        }
        await authApi.register({
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setMessage("Registration successful. Please login.");
        setIsRegister(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const data = await authApi.login({
          email: formData.email,
          password: formData.password,
        });
        login(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border-2 border-solid border-[black]">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          BrainLog
        </h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="error-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="lgn-reg-field border-2 border-solid border-[black]"
              />
            </>
          )}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="lgn-reg-field border-2 border-solid border-[black]"
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="lgn-reg-field border-2 border-solid border-[black]"
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              autoComplete="new-password"
              onChange={handleChange}
              required
              className="lgn-reg-field border-2 border-solid border-[black]"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer 
            border-2 border-solid border-[black]"
          >
            {submitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </button>
        </form>
        <button
          type="button"
          className="w-full text-center mt-4 text-blue-500 hover:text-blue-700 cursor-pointer "
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
            setMessage("");
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
