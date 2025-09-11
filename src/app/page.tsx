"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";



export default function Home() {
const {  data: session, } = authClient.useSession() 

    

  
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const handlesubmit= () => {
  authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email 
  },{
    onError: ()=>{
      window.alert("something went wrong ")
    },
    onSuccess: ()=>{
      window.alert("Success")
    }
  })
}
if(session){
  return (<div className="p-4 flex flex-col gap-y-4">
    <p> logggein in as {session.user.name}</p>
    <Button onClick={()=>authClient.signOut()}>signed-out</Button>
  </div>)
}
  return (
    <div className=" p-4 flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e)=>setname(e.target.value)}/>
      <Input placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
      <Input placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <Button onClick={handlesubmit}>submit</Button>
    </div>
  )
}
