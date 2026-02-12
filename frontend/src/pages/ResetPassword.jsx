import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import authApi from "../utils/authApi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get("token"); //token after successful email
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authApi.resetPassword({
        password,
        token: resetToken,
      });

      if (response.success) {
         alert("Password reset successful. Please log in");
         navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <Card className="text-white text-xl flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <h2
            className="text-3xl font-semibold text-center 
            text-blue-600 mb-4"
          >
            Reset Password
          </h2>

          <Label className="text-[16px] gap-2">New Password:</Label>
          <TextInput
            type="text"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Label className="text-[15px] gap-2">Confirm Password:</Label>
          <TextInput
            type="text"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full py-2 px-4 
            bg-blue-500 text-white font-semibold rounded-lg shadow-md
            hover:bg-blue-600 focus:outline-none focus:ring-2 
            focus:ring-blue-400 cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
