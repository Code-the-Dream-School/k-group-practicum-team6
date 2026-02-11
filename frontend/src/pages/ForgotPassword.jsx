import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import authApi from "../utils/authApi";

export default function ForgotPassword () {
    const [email, setEmail] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
           const response = await authApi.forgotPassword({ email });
            console.log(response);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    }
    
    return (
      <>
        <Card className="text-white text-xl flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
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
      </>
    );
}