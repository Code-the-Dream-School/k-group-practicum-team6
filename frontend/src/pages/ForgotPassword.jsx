import { useState, useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
export default function ForgotPassword () {
    return (
      <>
        <Card className="text-white text-xl flex justify-center items-center">
          <form className="flex max-w-md flex-col gap-4">
            <h2 className="text-3xl font-semibold text-center text-blue-600 
            mb-6">Forgot Password</h2>
            <div>
              <Label className="">Email:</Label>
              <TextInput className="" type="email" placeholder="Email" required/>
            </div>
            <Button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer" type="submit">Submit</Button>
          </form>
        </Card>
      </>
    );
}
