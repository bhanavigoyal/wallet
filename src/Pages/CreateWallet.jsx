import { ethers, HDNodeWallet, Wallet } from "ethers"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { useState } from "react"
import CryptoJS from "crypto-js"
import { Buffer } from "buffer"
import { InputBox } from "../components/InputBox"
import { CheckBox } from "../components/CheckBox"
import { useNavigate } from "react-router-dom"
import { generateMnemonic, mnemonicToSeed } from "bip39"
import { addWallet } from "../utils/addWallet"
import { CopyButton } from "../components/CopyButton"

window.Buffer = window.Buffer || Buffer;

export const CreateWallet=()=>{

    const [password, setPassword] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkMnemonic, setCheckMnemonic] = useState(false);


    const navigate = useNavigate();

    const handleGenerate=()=>{
        const newMnemonic = generateMnemonic()
        setMnemonic(newMnemonic);
        setCheckMnemonic(false);
    }

    const handleSave=async()=>{
        if(mnemonic){

            const seed = await mnemonicToSeed(mnemonic);
            const hdNode = HDNodeWallet.fromSeed(seed);

            const encryptedMasterKey = CryptoJS.AES.encrypt(hdNode.extendedKey, password).toString();
            console.log(encryptedMasterKey)
            localStorage.setItem('encryptedMasterKey', encryptedMasterKey);
            const response = await addWallet(password, 0);
            if (response.error){
                console.error(response.error);
            }else{
                localStorage.setItem("currentIndex", 1)
            }

            navigate("/dashboard")
        }
        
    }

    const handlePasswordClick=()=>{
        setCheckPassword(!checkPassword)
    }

    const handleRegenrate=()=>{
        handleGenerate()
    }

    

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
        <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
            <div className="flex flex-col items-center p-20 space-y-8">
                <Heading label={"Create Your Wallet!"}/>
            </div>
            <div className="flex flex-col items-center">
                {!mnemonic? (
                    <div className="flex flex-col items-center space-y-7">
                            <InputBox placeholder={"Create Password"} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
                            <CheckBox label={"I acknowledge that if I forget or loose the password my assets will be lost and won't be able to recover"} onClick={handlePasswordClick} disabled={password===""}/>
                           {checkPassword?(
                               <Button label={"Generate Mnemonic Phrase"} onClick={handleGenerate}/>
                           ):null}
                            
                        </div>
                    
                ):<div className="flex flex-col items-center">
                <div className="font-bold">Mnemonic Phrase: </div>
                <div className="text-sky-300 text-nowrap pb-2">{mnemonic}</div>
                <CopyButton textToCopy={mnemonic}/>
                <div className="pt-4 text-sm ">Store this phrase securely. You will need it to recover your wallet.</div>
                <div className="text-sky-700 text-xs underline pt-5 hover:cursor-pointer" onClick={handleRegenrate}>Regenrate</div>
                <div className="pt-14 pb-5">
                    <CheckBox label={"I have stored the mnemonic safely"} onChange={(e)=>{
                        setCheckMnemonic(e.target.checked)
                    }} checked={checkMnemonic}/>
                </div>
                {checkMnemonic?(
                    <Button label ={"Save Wallet"} onClick={handleSave} disabled={(password=="")}/>
                ):null}
             </div>}
            </div>
        </div>
    </div>
}
