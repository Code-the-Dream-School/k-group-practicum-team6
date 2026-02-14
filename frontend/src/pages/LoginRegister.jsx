import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";
import { Button, Card, Label, TextInput } from "flowbite-react";

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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <h2 className="text-4xl font-extrabold tracking-tight leading-[1.2] text-center pb-6 bg-gradient-to-r from-sky-700 to-cyan-500 dark:from-sky-600 dark:to-cyan-300 bg-clip-text text-transparent">
          BrainLog
        </h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="error-success">{message}</div>}
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          {isRegister && (
            <>
              <Label htmlFor="username">Username</Label>
              <TextInput
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </>
          )}
          <Label htmlFor="email">Email</Label>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <Label htmlFor="password">Password</Label>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {isRegister && (
            <TextInput
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              autoComplete="new-password"
              onChange={handleChange}
              required
            />
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md transition-colors duration-300
            focus:outline-none focus:ring-2 cursor-pointer"
          >
            {submitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Button
          type="button"
          className="w-full text-center mt-4 text-cyan-600 bg-transparent transition-colors duration-300 hover:bg-transparent focus:ring-0 dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-0 hover:text-cyan-700 cursor-pointer"
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
        </Button>
      </Card>
    </div>
  );
};

export default LoginRegister;
