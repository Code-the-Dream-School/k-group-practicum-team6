import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import authApi from "../utils/authApi";

export default function ForgotPassword () {
    const [email, setEmail] = useState("");
    
    const [message, setMessage] = useState("");
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
           await authApi.forgotPassword({ email });
           setMessage("Email for password reset sent to your email address.")
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    } 
    return (
      <>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm p-6">
          <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
            {message}
            <h2 className="text-3xl font-semibold text-center 
            text-blue-600 mb-6">Forgot Password</h2>
            <div>
              <Label className="text-[20px] mb-2">Email:</Label>
              <TextInput type="email" value={email} placeholder="Email" 
              onChange={(event => setEmail(event.target.value))} required/>
            </div>
            <Button type="submit" className="w-full py-2 px-4 
            bg-blue-500 text-white font-semibold rounded-lg shadow-md
            hover:bg-blue-600 focus:outline-none focus:ring-2 
            focus:ring-blue-400 cursor-pointer">Submit</Button>
          </form>
        </Card>
        </div>
      </>
    );
}