export const CheckBox=({label, onClick,disabled, checked,onChange})=>{
    return <div className="flex space-x-3 text-xs">
        <input type="checkbox" onClick={onClick} disabled={disabled} checked={checked} onChange={onChange} />
        <div>{label}</div>
    </div>
}