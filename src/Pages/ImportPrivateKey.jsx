import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom"

export const ImportPrivateKey=()=>{

    const [password, setPassword] = useState("")
    const [importedPrivateKey, setImportedPrivateKey] = useState("")

    const navigate = useNavigate();

    const handleImportPrivateKey=()=>{
        if(importedPrivateKey){
            try{

                const encryptedPrivateKey = CryptoJS.AES.encrypt(importedPrivateKey, password).toString()
                localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
                navigate("/dashboard")
            }catch(e){
                console.log(e)
            }
        }else{
            console.log('no importedPrivateKey')
        }
    }

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
        <div className="flex flex-col items-center h-full justify-center">
        <InputBox placeholder={"Create Password"} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
        <InputBox placeholder={"Enter Private Key"} onChange={(e)=>{
                                setImportedPrivateKey(e.target.value)
                            }}/>
        <Button label={"Import Wallet"} onClick={handleImportPrivateKey}/>
        </div>
    </div>
</div>
}