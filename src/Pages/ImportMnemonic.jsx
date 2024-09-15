import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers";

export const ImportMnemonic=()=>{

    const [password, setPassword] = useState("")
    const [importedMnemonic, setImportedMnemonic] = useState("")

    const navigate = useNavigate();

    const handleImportMnemonic=()=>{
        if(importedMnemonic){
            try{
                const wallet = ethers.Wallet.fromPhrase(importedMnemonic);
                const privateKey = wallet.privateKey;
                const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, password).toString()
                localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
                navigate("/dashboard")
            }catch(e){
                console.log(e)
            }
        }else{
            console.log('no importedMnemonic')
        }
    }

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
        <div className="flex flex-col items-center h-full justify-center">
        <InputBox placeholder={"Create Password"} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
        <InputBox placeholder={"Enter Mnemonic"} onChange={(e)=>{
                                setImportedMnemonic(e.target.value)
                            }}/>
        <Button label={"Import Wallet"} onClick={handleImportMnemonic}/>
        </div>
    </div>
</div>
}