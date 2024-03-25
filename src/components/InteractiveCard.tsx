'use client'
import React from 'react';

export default function InteractiveCard({children}:{children:React.ReactNode}){
    function oncardMouseAction(event:React.SyntheticEvent){
        if(event.type=='mouseover'){
            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-neutral-100')
        }else{
            event.currentTarget.classList.remove('bg-neutral-100')
            event.currentTarget.classList.add('bg-white')
        }
    }

    return(
        <div className='w-[300px] h-[600px] bg-white' 
        onMouseOver={(e)=> oncardMouseAction(e)}
        onMouseOut={(e)=> oncardMouseAction(e)}>
            {children}
        </div>
    );
}