import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";

export default function ForgotPassword () {
    const [email, setEmail] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
    }
    
    return (
      <>
        <Card >
          <form>
            <h2>Forgot Password</h2>
            <div>
              <Label className="">Email:</Label>
              <TextInput  
              type="email"placeholder="Email" required/>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </>
    );
}