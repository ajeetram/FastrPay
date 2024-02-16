import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import './card.css'
const Card = ({ checkoutHandler}) => {
    const [amnt, setAmnt] = useState(0);
    return (
        <div className='card'>
            <input 
            type='number' 
            placeholder='enter amount'
            value = {amnt}
            onChange={(e)=>setAmnt(e.target.value)}
            required
            />
            <Button onClick={() => checkoutHandler(amnt)}>CheckOut Now</Button>
        </div>
    )
}

export default Card ;