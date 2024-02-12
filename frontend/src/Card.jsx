import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import './card.css'
const Card = ({ checkoutHandler }) => {
    const [amnt1, setAmnt1] = useState(0);
    const [amnt2, setAmnt2] = useState(0);
    return (
        <div className='card'>
            <input 
            type='number' 
            placeholder='enter amount'
            value = {amnt1}
            onChange={(e)=>setAmnt1(e.target.value)}
            />
            <input 
            type='number' 
            placeholder='enter amount'
            value = {amnt2}
            onChange={(e)=>setAmnt2(e.target.value)}
            />
            <Button onClick={() => checkoutHandler(amnt1,amnt2)}>CheckOut Now</Button>
        </div>
    )
}

export default Card ;