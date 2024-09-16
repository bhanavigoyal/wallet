import { useEffect, useState } from "react"
import { Heading } from "../components/Heading";
import { useAuth } from "../components/AuthContext";
import { ethers } from "ethers";
import { Button } from "../components/Button";
import { addWallet } from "../utils/addWallet";

export const Dashboard=()=>{
    const [balance, setBalance] = useState('');
    const [currentIndex, setCurrentIndex] = useState(1);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [loading, setLoading] = useState(true)
    const {} = useAuth();

    const fetchBalance = async (address)=>{
        setLoading(true)
        console.log("here")
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
                const address = addWallet("6789", i).address; // Derive the address from each index
                savedAddresses.push(address);
            }
            setAddresses(savedAddresses);
            setCurrentIndex(index);
        } else {
            setCurrentIndex(1);  // Set to 1 if no index is saved
        }
    },[])

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);  // Set first address if none selected
            fetchBalance(addresses[0]);  // Fetch balance of the first address
        }
    }, [addresses]);

    const generateNewWAllet = async()=>{
        const newWallet = await addWallet("6789", currentIndex);
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
                <div className="flex">
                    <div>{selectedAddress}</div>
                    <div className="pl-2">Copy address</div>
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
        console.log(isOpen)
    };

    return <div>
        <button onClick={toggleDropdown} id="dropdownDefaultButton" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Your Addresses <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        {isOpen ?(
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {addresses.map((address, index)=>(
                    <li key={index}>
                        <button onClick={()=>onSelectAddress(address)}>
                            {address}
                        </button>
                    </li>
                ))}
            </ul>
        </div>): (null)}
    </div>
}