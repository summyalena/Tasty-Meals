import React from 'react'

 // wrap the ref in the component
const Input = React.forwardRef((props,ref) =>{
    return(
        <div className='flex items-center mb-2'>
            <label className="font-bold text-indigo" htmlFor={props.input.id}> {props.label}</label>
            <input className="w-20 border border-slate-200 ml-1 text-center pl-3" ref={ref} {...props.input}/>
        </div>
    ) ;
});

export default Input;