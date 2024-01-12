import React, { useState, useEffect } from 'react'

import Background from './assets/BG.png'
import Logo from './assets/Logo.png'
import Banner from './assets/Banner.png'

import Button from './components/Button'

import { Fade as Hamburger } from 'hamburger-react'
import Modal from 'react-modal'

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

    const [items, setItems] = useState([])

    const [showAddModal, setShowAddModal] = useState(false)

    const [showSellModal, setShowSellModal] = useState(false)

  const [newItem, setNewItem] = 
  useState
  (
    {
      productName: '',
      category: '',
      originalPrice: '',
      sellingPrice: '',
      quantity: '',
      quantitySold:'',
      sellingQuantity: ''
    }
  )

  const handleInputChange = (e) => 
  {
    const { name, value } = e.target

    setNewItem
    (
      (prevItem) => 
      (
        {
          ...prevItem,
          [name]: value,
          quantitySold:0
        }
      )
    )
  }

  const [totalSale, setTotalSale] = useState(0)
  
  const [totalSpent, setTotalSpent] = useState(0)

  const addItem = () => 
  {
    setItems((prevItems) => [...prevItems, newItem])

    setTotalSpent(totalSpent + (Number(newItem.quantity) * Number(newItem.originalPrice)))

    setNewItem
    (
      {
        productName: '',
        category: '',
        originalPrice: '',
        sellingPrice: '',
        quantity: '',
        quantitySold:'',
        sellingQuantity: ''
      }
    )
    setShowAddModal(false)
  }

  const sellItem = () => 
  {
    const updatedItems = [...items]
  
    const selectedItemIndex = updatedItems.findIndex
    (
      (item) => item.productName === selectedItem.productName && item.category === selectedItem.category && item.originalPrice === selectedItem.originalPrice && item.sellingPrice === selectedItem.sellingPrice
    )
  
    if (selectedItemIndex !== -1)
    {
      updatedItems[selectedItemIndex].quantity -= Number(newItem.sellingQuantity)
      updatedItems[selectedItemIndex].quantitySold += Number(newItem.sellingQuantity)
      setItems(updatedItems)
    }
  
    setShowSellModal(false)

    console.log(items)
  }

  const [selectedItem, setSelectedItem] = useState(null)

  const select = (item) => 
  {
    setSelectedItem(item)
  }

  const categories = [ 'Blue Switch', 'Red Switch', 'Brown Switch','Black Switch']



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
              textcolor = { `${isExpenses ? 'text-white': 'text-primary'} hover:text-white` }
              color = {  `${isExpenses ? 'bg-primary': 'bg-white'} hover:bg-primary` }
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
              textcolor = { `${isInventory ? 'text-white': 'text-primary'} hover:text-white` }
              color = {  `${isInventory ? 'bg-primary': 'bg-white'} hover:bg-primary` }
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
              textcolor = { `${isReport ? 'text-white': 'text-primary'} hover:text-white` }
              color = {  `${isReport ? 'bg-primary': 'bg-white'} hover:bg-primary` }
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
                    <div className='max-w-[100rem] mx-auto '>
                      <h1 className='text-3xl font-bold text-center py-6 '>List of Items</h1>

                      <div className='bg-primary flex w-full mx-auto  rounded-md rounded-b-none  border-2 border-primary'>
                        <div className='w-[20%] py-2 px-4   text-white text-2xl font-main font-bold '> Product Name</div>
                        <div className='w-[20%] p-2 text-center  text-white text-2xl font-main font-bold '> Category</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Original Price</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Selling Price</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Stock</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Quantity Sold</div>
                      </div>
                      {
                        items.filter(item => item.quantity > 0) 
                        .map((item, index) => 
                        (
                          <div 
                            key={index} 
                            className={` cursor-pointer flex w-full mx-auto border-primary border-l-2 border-b-2 border-r-2 ${index === items.length -1 ? 'rounded-b-md' : ''} ${selectedItem === item ? 'bg-tertiary' : ''} `}
                            onClick={() => select(item)}
                          >
                            <div className={`w-[20%] py-2 px-4 text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.productName}</div>
                            <div className={`w-[20%] p-2 text-center  text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.category}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.originalPrice}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.sellingPrice}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.quantity}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main ${selectedItem === item ? 'text-white' : 'text-primary'}`}>{item.quantitySold}</div>
                          </div>
                        ))
                      }
                      <div className='flex justify-center gap-10 mt-8'>
                        <Button 
                          text = { "Add Item" }
                          width = { "w-1/6" }
                          margin = { "" }
                          padding = { "p-2" }
                          textsize = { "text-2xl" }
                          textcolor = { `text-primary hover:text-white` }
                          color = {  `bg-white hover:bg-primary` }
                          border = { "border-2 border-primary" }
                          disabled = { "" }
                          onClick={() => setShowAddModal(true)}
                        />
                        <Button 
                          text = { "Sell Item" }
                          width = { "w-1/6" }
                          margin = { "" }
                          padding = { "p-2" }
                          textsize = { "text-2xl" }
                          textcolor = { `text-primary hover:text-white` }
                          color = {  `bg-white hover:bg-primary` }
                          border = { "border-2 border-primary" }
                          disabled = { selectedItem === null }
                          onClick =  {() => {setShowSellModal(true);  newItem.sellingQuantity = 0} }
                        />
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                          <h1 className='text-2xl font-bold text-center p-6 '>Summary</h1>

                          <div className='flex flex-col gap-3 w-1/3 '>
                            <div className='flex items-center gap-6 justify-center'>
                              <h1 className='text-3xl  font-mono font-bold'>Total Spent:&#8369;</h1>
                              <h1 className='text-3xl text-right font-mono font-bold'>{totalSpent}</h1>
                            </div>
                          </div>

                          <div className='flex flex-col gap-3 w-1/3 '>
                            <div className='flex items-center gap-6 justify-center'>
                              <h1 className='text-3xl  font-mono font-bold'>Total Sales:&#8369;</h1>
                              <h1 className='text-3xl text-right font-mono font-bold'>{totalSale}</h1>
                            </div>
                          </div>

                      </div>

                    </div>
                    {
                      showAddModal &&
                      (
                        <>
                          <Modal
                            isOpen={ showAddModal }
                            onRequestClose={ () => setShowAddModal(false) }
                            style=
                            { 
                                {
                                    content: 
                                    {
                                        height: '75%',
                                        margin: 'auto',
                                        maxWidth: '1280px',
                                    }
                                }
                            }
                            contentLabel="Add Items"
                          >
                            <div className='px-6 flex gap-16 flex-col'>
                              <h1 className="text-4xl font-bold text-center p-4 ">Add New Item</h1>

                              <div className='flex items-center'>
                                <h1 className='text-2xl w-1/6 font-mono font-semibold'>Product Name:</h1>
                                <input
                                  className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                  type='text'
                                  value= { newItem.productName }
                                  placeholder='Product Name'
                                  name="productName"
                                  onChange={ handleInputChange }
                                />
                              </div>
                              
                              <div className='flex gap-10 '>
                                <div className='w-1/2 flex items-center'>
                                  <h1 className='text-2xl w-1/2 font-mono font-semibold'>Switch Color:</h1>
                                  <select
                                    className='text-primary font-bold w-full text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                    name="category"
                                    value={newItem.category}
                                    onChange={ handleInputChange }
                                  >
                                    <option value='' className='bg-tertiary text-white'>Select a Color</option>
                                    {
                                      categories.map((category) => 
                                      (
                                        <option key={category} value={category} className='bg-tertiary text-white'>
                                          {category}
                                        </option>
                                      ))
                                    }
                                  </select>
                                </div>

                                <div className='w-1/2 flex items-center'>
                                  <h1 className='text-2xl w-2/6 font-mono font-semibold'>Quantity:</h1>
                                  <input
                                    className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                    type='number'
                                    name="quantity"
                                    value= { newItem.quantity }
                                    placeholder='Quantity'
                                    onChange={ handleInputChange }
                                  />
                                </div>

                              </div>
                              
                              <div className='flex gap-10 '>
                                <div className='w-1/2 flex items-center'>
                                  <h1 className='text-2xl w-3/6 font-mono font-semibold'>Original Price:</h1>
                                  <input
                                    className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                    type='number'
                                    name="originalPrice"
                                    value= { newItem.originalPrice }
                                    placeholder='Original Price'
                                    onChange={ handleInputChange }
                                  />
                                </div>

                                <div className='w-1/2 flex items-center'>
                                  <h1 className='text-2xl w-1/2 font-mono font-semibold'>Selling Price:</h1>
                                  <input
                                    className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                    type='number'
                                    name="sellingPrice"
                                    value= { newItem.sellingPrice }
                                    placeholder='Selling Price'
                                    onChange={ handleInputChange }
                                  />
                                </div>

                              </div>
                              
                              <div className='flex gap-10 mx-auto mt-16'>
                                <Button 
                                  text = { "Add" }
                                  width = { "w-48" }
                                  margin = { "" }
                                  padding = { "p-2" }
                                  textsize = { "text-2xl" }
                                  textcolor = { `text-primary hover:text-white` }
                                  color = {  `bg-white hover:bg-primary` }
                                  border = { "border-2 border-primary " }
                                  disabled = { newItem.productName === "" || newItem.category === "" || newItem.quantity === "" || newItem.originalPrice === "" || newItem.sellingPrice === ""  }
                                  onClick =  { addItem }
                                />
                                <Button 
                                  text = { "Cancel" }
                                  width = { "w-48" }
                                  margin = { "" }
                                  padding = { "p-2" }
                                  textsize = { "text-2xl" }
                                  textcolor = { `text-primary hover:text-white` }
                                  color = {  `bg-white hover:bg-primary` }
                                  border = { "border-2 border-primary " }
                                  disabled = { "" }
                                  onClick =  { () => setShowAddModal(false)}
                                />
    
                              </div>
                            </div>

                          </Modal>
                        </>
                      )
                    }
                    {
                      showSellModal &&
                      (
                        <>
                          <Modal
                            isOpen={ showSellModal }
                            onRequestClose={ () => setShowSellModal(false) }
                            style=
                            { 
                                {
                                    content: 
                                    {
                                        height: '75%',
                                        margin: 'auto',
                                        maxWidth: '1280px',
                                    }
                                }
                            }
                            contentLabel="Add Items"
                          >
                            <div className='px-6 flex gap-10 flex-col'>
                              <h1 className="text-4xl font-bold text-center p-4 ">Sell Item</h1>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-2xl w-1/6 font-mono font-semibold'>Product Name:</h1>
                                <h1 className='text-2xl w-5/6 font-mono font-semibold'>{selectedItem.productName}</h1>
                              </div>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-2xl w-1/6 font-mono font-semibold'>Switch Color:</h1>
                                <h1 className='text-2xl w-5/6 font-mono font-semibold'>{selectedItem.category}</h1>
                              </div>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-2xl w-1/6 font-mono font-semibold'>Price per unit:</h1>
                                <h1 className='text-2xl w-4/6 font-mono font-semibold'>{selectedItem.sellingPrice}</h1>
                              </div>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-2xl w-1/6 font-mono font-semibold'>Quantity:</h1>
                                <input
                                    className=' text-primary focus:text-white focus:bg-tertiary font-bold w-5/6 text-2xl p-2 border-b-2 border-secondary focus:outline-tertiary '
                                    type='number'
                                    name="sellingQuantity"
                                    value= { newItem.sellingQuantity }
                                    placeholder='Quantity'
                                    onChange={ handleInputChange }
                                    min={0}
                                    max={selectedItem.quantity}
                                  />
                              </div>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-4xl  font-mono font-bold'>Stock Left: </h1>
                                <h1 className='text-4xl  font-mono font-bold'>{ Number(selectedItem.quantity) - Number(newItem.sellingQuantity )  }</h1>
                              </div>

                              <div className='flex items-center gap-6'>
                                <h1 className='text-4xl  font-mono font-bold'>Total Price:&#8369; </h1>
                                <h1 className='text-4xl  font-mono font-bold'>{ Number(newItem.sellingQuantity ) * Number(selectedItem.sellingPrice) }</h1>
                              </div>

                              <div className=' w-48 mx-auto'>
                                <Button 
                                  text = { "Sell" }
                                  width = { "w-full" }
                                  margin = { "" }
                                  padding = { "p-2" }
                                  textsize = { "text-2xl" }
                                  textcolor = { `text-primary hover:text-white` }
                                  color = {  `bg-white hover:bg-primary` }
                                  border = { "border-2 border-primary " }
                                  disabled = { newItem.sellingQuantity === "" ||  newItem.sellingQuantity === 0 }
                                  onClick =  { () => { sellItem(); setTotalSale(totalSale + (Number(newItem.sellingQuantity ) * Number(selectedItem.sellingPrice)))} }
                                />
                              </div>
                            </div>
                          </Modal>
                        </>
                      )
                    }
                  </>
                  ) 
                : 
                isReport ? 
                ( 
                  <>
                    <div className='max-w-7xl mx-auto'>
                      <h1 className='text-3xl font-bold text-center p-6 '>List of Sold Items (Arrange from Most Sold to Least)</h1>
                      <div className='bg-primary flex w-full mx-auto  rounded-md rounded-b-none  border-2 border-primary'>
                        <div className='w-[20%] py-2 px-4   text-white text-2xl font-main font-bold '> Product Name</div>
                        <div className='w-[20%] p-2 text-center  text-white text-2xl font-main font-bold '> Category</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Selling Price</div>
                        <div className='w-[15%] p-2 text-center  text-white text-2xl font-main font-bold '> Quantity Sold</div>
                        <div className='w-[30%] p-2 text-center  text-white text-2xl font-main font-bold '> Total Sales per Item</div>

                      </div>
                      {
                        items
                        .filter(item => item.quantitySold > 0)
                        .sort((a, b) => b.quantitySold - a.quantitySold)
                        .map((item, index) => 
                        (
                          <div 
                            key={index} 
                            className={`item-center flex w-full mx-auto border-primary border-l-2 border-b-2 border-r-2 ${index === items.length -1 ? 'rounded-b-md' : ''} ${selectedItem === item ? 'bg-tertiary' : ''} `}
                          >
                            <div className={`w-[20%] p-2 text-center text-2xl font-main text-primary`}>{item.productName}</div>
                            <div className={`w-[20%] p-2 text-center text-2xl font-main text-primary`}>{item.category}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main text-primary` }>{item.sellingPrice}</div>
                            <div className={`w-[15%] p-2 text-center text-2xl font-main text-primary`}>{item.quantitySold}</div>
                            <div className={`w-[30%] p-2 text-center text-2xl font-main text-primary`}>{item.quantitySold * item.sellingPrice}</div>
                          </div>
                        ))
                      }
                    </div>
                  </>
                ) 
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