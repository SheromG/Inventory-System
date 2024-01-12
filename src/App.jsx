import React, { useState, useEffect } from 'react'

import Background from './assets/BG.png'
import Logo from './assets/Logo.png'
import Banner from './assets/Banner.png'

import Button from './components/Button'

import { Fade as Hamburger } from 'hamburger-react'

const App = () => 
{
  const [ isHamburger, setIsHamburger] = useState(true)

  const[ isExpenses , setIsExpenses ] = useState(false)

  const[ isInventory , setIsInventory ] = useState(false)

  const[ isReport, setIsReport ] = useState(false)

  const [stateExpenses, setStateExpenses] = 
  useState
  (
    {
      storeRental:0,
      saleStaff:0,
      electricBill:0,
      waterBill:0,
      total: 0,
    }
  )

  useEffect(() => 
  {
      setStateExpenses((state) => 
      (
        {
        ...state,
        total: Number(state.storeRental) + Number(state.saleStaff) + Number(state.electricBill) + Number(state.waterBill) 
        }
      ))
    }, [stateExpenses.storeRental, stateExpenses.saleStaff, stateExpenses.electricBill, stateExpenses.waterBill]);

  const handleChange = (fieldName, value) => 
    {
        setStateExpenses(state => 
        (
            {
            ...state,
            [fieldName]: value,
            }
        ))
    }

  return (
    <>
      <div className='border-b-primary border-2 '>
        <nav className='max-w-7xl mx-auto flex justify-between items-center '>
          <img src={Logo} className='max-h-24'/>
          <img src={Banner} className='max-h-24'/>
          <Hamburger toggled={isHamburger} toggle={setIsHamburger}/>
        </nav>
      </div>
      {
        isHamburger ?
        (
        <>
          <div className='flex gap-6 max-w-7xl mx-auto my-6'>
            <Button 
              text = { "Expenses" }
              width = { "w-1/3" }
              margin = { "" }
              padding = { "p-4" }
              textsize = { "text-2xl" }
              textcolor = { `${isExpenses ? 'text-white': 'text-primary'}` }
              color = {  `${isExpenses ? 'bg-primary': 'bg-white'}` }
              border = { "border-2 border-primary" }
              disabled = { "" }
              onClick = 
              {  
                () => 
                {
                  setIsExpenses(true)
                  setIsInventory(false)
                  setIsReport(false)
                }
              }
            />
            <Button 
              text = { "Inventory" }
              width = { "w-1/3" }
              margin = { "" }
              padding = { "p-4" }
              textsize = { "text-2xl" }
              textcolor = { `${isInventory ? 'text-white': 'text-primary'}` }
              color = {  `${isInventory ? 'bg-primary': 'bg-white'}` }
              border = { "border-2 border-primary" }
              disabled = { "" }
              onClick = 
              {  
                () => 
                {
                  setIsExpenses(false)
                  setIsInventory(true)
                  setIsReport(false)
                }
              }
            />
            <Button 
              text = { "Inventory Report" }
              width = { "w-1/3" }
              margin = { "" }
              padding = { "p-4" }
              textsize = { "text-2xl" }
              textcolor = { `${isReport ? 'text-white': 'text-primary'}` }
              color = {  `${isReport ? 'bg-primary': 'bg-white'}` }
              border = { "border-2 border-primary" }
              disabled = { "" }
              onClick = 
              {  
                () => 
                {
                  setIsExpenses(false)
                  setIsInventory(false)
                  setIsReport(true)
                }
              }
            />
          </div>
        </>
        )
        :
        (<></>)
      }
      {
        isExpenses || isInventory || isReport  === true ?
        (
          <>
            {
                isExpenses ? 
                ( 
                  <>
                    <div className='max-w-7xl mx-auto'>
                      <h1 className='text-3xl font-bold text-center p-6 '> Input the Weekly Expenses </h1>
                      <div className=' flex gap-10 flex-col'>

                        <div className='flex items-center w-full'>
                          <h1 className='text-2xl w-1/6 font-mono font-semibold'>Store Rental:</h1>
                          <input
                            className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                            type='number'
                            value={ stateExpenses.storeRental === 0 ? (null): (stateExpenses.storeRental) }
                            placeholder='Store Rental'
                            onChange={(e) => handleChange('storeRental', e.target.value)}
                          />
                        </div>

                        <div className='flex items-center w-full'>
                          <h1 className='text-2xl w-1/6 font-mono font-semibold'>Sale Staff:</h1>
                          <input
                            className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                            type='number'
                            value={ stateExpenses.saleStaff === 0 ? (null): (stateExpenses.saleStaff) }
                            placeholder='Sale Staff'
                            onChange={(e) => handleChange('saleStaff', e.target.value)}
                          />
                        </div>

                        <div className='flex items-center w-full'>
                          <h1 className='text-2xl w-1/6 font-mono font-semibold'>Electric Bill:</h1>
                          <input
                            className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                            type='number'
                            placeholder='Electric Bill'
                            value={ stateExpenses.electricBill === 0 ? (null): (stateExpenses.electricBill) }
                            onChange={(e) => handleChange('electricBill', e.target.value)}
                          />
                        </div>

                        <div className='flex items-center w-full'>
                          <h1 className='text-2xl w-1/6 font-mono font-semibold'>Water Bill:</h1>
                          <input
                            className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                            type='number'
                            value={ stateExpenses.waterBill === 0 ? (null): (stateExpenses.waterBill) }
                            placeholder='Water Bill'
                            onChange={(e) => handleChange('waterBill', e.target.value)}
                          />
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                          <h1 className='text-2xl font-bold text-center p-2 '>Summary</h1>

                          <div className='flex flex-col gap-3 w-1/4 mx-auto '>
                            <div className='flex items-center gap-6 '>
                              <h1 className='text-2xl w-2/3 font-mono font-semibold'>Store Rental:</h1>
                              <h1 className='text-2xl w-1/3 text-right font-mono font-semibold'>{stateExpenses.storeRental}</h1>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-1/4 mx-auto '>
                            <div className='flex items-center gap-6 '>
                              <h1 className='text-2xl w-2/3 font-mono font-semibold'>Sales Staff:</h1>
                              <h1 className='text-2xl w-1/3 text-right font-mono font-semibold'>{stateExpenses.saleStaff}</h1>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-1/4 mx-auto '>
                            <div className='flex items-center gap-6 '>
                              <h1 className='text-2xl w-2/3 font-mono font-semibold'>Electric Bill:</h1>
                              <h1 className='text-2xl w-1/3 text-right font-mono font-semibold'>{stateExpenses.electricBill}</h1>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-1/4 mx-auto '>
                            <div className='flex items-center gap-6 '>
                              <h1 className='text-2xl w-2/3 font-mono font-semibold'>Water Bill:</h1>
                              <h1 className='text-2xl w-1/3 text-right font-mono font-semibold'>{stateExpenses.waterBill}</h1>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-1/4 mx-auto '>
                            <div className='flex items-center gap-6 '>
                              <h1 className='text-4xl w-2/3 font-mono font-bold'>Total:</h1>
                              <h1 className='text-4xl w-1/3 text-right font-mono font-bold'>{stateExpenses.total}</h1>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </> 
                ) 
                :
                isInventory ? 
                ( 
                  <>
                    <div className='max-w-7xl mx-auto'>
                      <h1 className='text-3xl font-bold text-center p-6 '>List of Items</h1>
                      <div className=' '>

                      </div>
                    </div>
                  </>
                  ) 
                : 
                isReport ? ( <>Report </>) 
                : null
            }
        </>
        )
        :
        (
          <Bg />
        )
    }
    </>
  )
}

export default App

const Bg = () =>
{
  return(
    <div className='w-full flex items-center justify-center opacity-50'>
      <img src={Background} />
    </div>
  )
}