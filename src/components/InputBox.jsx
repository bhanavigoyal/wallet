export const InputBox=({placeholder, onChange})=>{
    return <input className="w-60 text-black p-3 mt-7 mb-7 rounded-lg bg-slate-200  focus:outline-none focus:ring-0 " type="password" placeholder={placeholder} onChange={onChange} />
}