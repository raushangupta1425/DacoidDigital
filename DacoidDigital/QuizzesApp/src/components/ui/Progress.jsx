export const Progress = ({value, maxLength})=>{
    return(
        <>
        <div>
            <progress value={value} max={maxLength} className="mt-4 w-full rounded text-white" />
        </div>
        </>
    )
}