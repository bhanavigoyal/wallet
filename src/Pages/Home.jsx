import { Heading } from "../components/Heading"
import { Button } from "../components/Button"

export const Home = ()=>{

    return <div className="flex flex-col justify-center h-screen bg-stone-950 text-slate-100">
        <div className="flex flex-col items-center space-y-8">
        <Heading label={"Get started with your web3 journey!"}/>
        <div className="flex space-x-6">
            <Button label={"Create Account"} path={"/createwallet"}/>
            <Button label={"Import Account"} path={"/importwallet"}/>
            <Button label={"Launch App"} path={"/dashboard"}/>
        </div>
        </div>
    </div>
}