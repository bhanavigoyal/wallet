import { useEffect, useState } from "react"
import { Heading } from "../components/Heading";
import { useAuth } from "../components/AuthContext";
import { ethers } from "ethers";

export const Dashboard=()=>{
    const [balance, setBalance] = useState('');
    const {privateKey} = useAuth();

    useEffect(()=>{
        const fetchBalance = async ()=>{
            try{
                if (/^(0x)?[0-9a-fA-F]{64}$/.test(privateKey)) {
                const wallet = new ethers.Wallet(privateKey);
                const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/462c816ec62d43da906f4812f3c556c3');
                const balance = await provider.getBalance(wallet.address);
                setBalance(ethers.formatEther(balance))
                }else{
                    throw new Error("invalid format")
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchBalance();
    },[privateKey])

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
        <div className="flex flex-col items-center p-20 space-y-8">
            <Heading label={"Dashboard"}/>
        </div>
        <div className="flex flex-col items-center">
            {balance? (
                <div className="flex flex-col items-center space-y-7">
                        {balance}
                </div> 
            ):(
                <div> Loading balance ...</div>
            )}
        </div>
    </div>
</div>
}