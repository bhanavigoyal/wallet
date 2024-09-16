import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers";
import { HDNodeWallet } from "ethers";
import { mnemonicToSeed } from "bip39";
import { addWallet } from "../utils/addWallet";

export const ImportMnemonic=()=>{

    const [password, setPassword] = useState("")
    const [importedMnemonic, setImportedMnemonic] = useState("")

    const navigate = useNavigate();

    const handleImportMnemonic=async()=>{
        if(importedMnemonic){
            try{
                const seed = await mnemonicToSeed(importedMnemonic);
                const hdNode = HDNodeWallet.fromSeed(seed);

                const encryptedMasterKey = CryptoJS.AES.encrypt(hdNode.extendedKey, password).toString()
                localStorage.setItem('encryptedMasterKey', encryptedMasterKey);
                const response = await addWallet(password, 0);
                if (response.error){
                    console.error(response.error);
                }else{
                    localStorage.setItem("currentIndex", 1)
                }
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