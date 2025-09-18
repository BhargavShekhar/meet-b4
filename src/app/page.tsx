"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log("submit button clicked!!");
    authClient.signUp.email({
      email,
      password,
      name
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        alert("successful");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    })
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-2 ">
        <Input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />

        <Button
          onClick={onSubmit}
        >
          Create User
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p>User is logged In as {session.user.name}</p>
      <Button
        onClick={() => authClient.signOut()}
      >
        SignOut
      </Button>
    </div>
  );
}
