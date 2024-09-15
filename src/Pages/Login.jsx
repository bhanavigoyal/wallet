import { useState } from "react"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login=()=>{

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {authenticate} = useAuth();
    const navigate = useNavigate();

    const handleUnlockWallet=()=>{
        if(authenticate(password)){
            navigate('/dashboard')
        }
    }

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
    <div className="flex flex-col items-center p-20 space-y-8">
        <Heading label={"Log In to your Wallet"}/>
    </div>
    <div className="flex flex-col items-center justify-center">
        <InputBox placeholder={"Enter Password"} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
        <Button label={"Log In"} onClick={handleUnlockWallet}/>
        </div>
    </div>
</div>
}