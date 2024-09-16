import { useEffect, useState } from "react"
import { Heading } from "../components/Heading";
import { useAuth } from "../components/AuthContext";
import { ethers } from "ethers";
import { Button } from "../components/Button";
import { addWallet } from "../utils/addWallet";
import { CopyButton } from "../components/CopyButton";

export const Dashboard=()=>{
    const [balance, setBalance] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [loading, setLoading] = useState(true)
    const {password} = useAuth();

    const fetchBalance = async (address)=>{
        setLoading(true)
        try{
            if (/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
                const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/462c816ec62d43da906f4812f3c556c3');
                const balance = await provider.getBalance(address);
                setLoading(false)
                setBalance(ethers.formatEther(balance));
            }else{
                throw new Error("invalid format")
            }
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{   
        const savedIndex = localStorage.getItem('currentIndex');
        const savedAddresses = [];
        if (savedIndex) {
            const index = parseInt(savedIndex, 10);
            for (let i = 0; i < index; i++) {
                const address = addWallet(password, i).address; 
                savedAddresses.push(address);
            }
            setAddresses(savedAddresses);
            setCurrentIndex(index);
        } else {
            setCurrentIndex(1);  
        }
    },[])

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);  
            fetchBalance(addresses[0]);  
        }
    }, [addresses]);

    const generateNewWAllet = async()=>{
        const newWallet = await addWallet(password, currentIndex);
        if (!newWallet.error) {
            setAddresses([...addresses, newWallet.address]);
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            localStorage.setItem('currentIndex', newIndex);
            setSelectedAddress(newWallet.address);
        }
    }

    const handleSelectAddress = (address)=>{
        setSelectedAddress(address);
        fetchBalance(address);
    }

    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
        <div className="flex flex-col items-center p-20 space-y-8">
            <Heading label={"Dashboard"}/>
        </div>
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-3/5">
                <Dropdown addresses={addresses} onSelectAddress={handleSelectAddress} />
                <Button label={"Add Wallet"} onClick={generateNewWAllet}/>
            </div>
            <div className="pt-10">
                <div className="flex items-center">
                    <div>{selectedAddress}</div>
                    <div className="pl-2">
                        <CopyButton textToCopy={selectedAddress}/>
                    </div>

                </div> 
                <div className="pt-5">

                {loading? (
                     <div>loading ...</div>
                ):(
                    <div className="flex flex-col items-center space-y-7 text-4xl font-semibold">
                            {balance} ETH
                    </div>
                )}
                </div>
            </div>
        </div>
    </div>
</div>
}

function Dropdown({addresses, onSelectAddress}){
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const formatAddress = (address) => {
        return `${address.slice(0, 8)}.....${address.slice(-6)}`;
    };

    return <div className="relative">
        <button onClick={toggleDropdown} id="dropdownDefaultButton" className="border p-3 rounded-md border-sky-900 bg-sky-900 hover:bg-sky-600 hover:cursor-pointer inline-flex items-center" type="button">Your Addresses <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        {isOpen ?(
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-2 max-h-60 overflow-y-auto">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                {addresses.map((address, index)=>(
                    <li key={index}>
                        <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={()=>onSelectAddress(address)}>
                            {formatAddress(address)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>): (null)}
    </div>
}