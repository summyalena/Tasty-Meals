const Card = (props)=>{
    return <div className='bg-white mx-auto p-5 rounded-lg text-black-400'>
        {props.children}
    </div>

}

export default Card;