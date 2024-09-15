import { Link } from "react-router-dom"

export const Button=({label, path,onClick, disabled})=>{
    return <button className="border p-3 rounded-md border-sky-900 bg-sky-900 hover:bg-sky-600 hover:cursor-pointer" onClick={onClick} >
    <Link to={path}>{label}</Link>
</button>
}