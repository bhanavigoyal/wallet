import { Button } from "../components/Button"
import { Heading } from "../components/Heading"

export const ImportWallet=()=>{
    return <div className="bg-stone-700 text-slate-200 h-screen flex items-center justify-center">
    <div className="bg-stone-950 h-3/4 w-1/2 border rounded-xl border-stone-950">
    <div className="flex flex-col items-center p-20 space-y-8">
        <Heading label={"Recover Your Wallet"}/>
        <div className="flex space-x-6 pt-20">
            <Button label={"Use Private Key"} path={"/importwallet/privatekey"}/>
            <Button label={"Use Mnemonic"} path={"/importwallet/mnemonic"}/>
        </div>
    </div>
</div>
</div>
}