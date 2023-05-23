import React, { useEffect, useState } from 'react'
import '../style/Form.css'
import { Heading, Input, Select } from '@chakra-ui/react'

const imageMimeType = /image\/(png|jpg|jpeg)/i

function Form() {
  const [ProductData, setProductData] = useState({
    product_name: '',
    image_url: '',
    price: 0,
    quantity: 0,
    category: '',
    discount: 0,
  })

  // function to get input value and set it to in the  state(data)
  const [file, setFile] = useState(null)
  const handleInputValue = (e) => {
    const { name, value } = e.target
    setProductData({
      ...ProductData,
      [name]: e.target.type === 'number' ? +value : value,
    })
  }

  // crud operation

  // function to {add} product in `http://localhost:3000/product` url
  const Addproduct = async (e) => {
    e.preventDefault()
    try {
      if (
        ProductData.product_name === '' ||
        ProductData.image_url === '' ||
        ProductData.price === 0 ||
        ProductData.quantity === 0 ||
        ProductData.category === '' ||
        ProductData.discount === 0
      ) {
        alert('please fill all the details. you are missing something!')
      } else {
        await fetch(`http://localhost:3000/product`, {
          method: 'POST',
          body: JSON.stringify(ProductData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        alert('product added successfully')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // function to {add} product via local system
  const changeHandler = (e) => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid')
      return
    }
    setFile(file)
  }
  useEffect(() => {
    let fileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setProductData({ ...ProductData, image_url: result })
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])

  return (
    <div>
      <Heading className="heading">Form</Heading>
      <div className="form">
        <form action="" onSubmit={Addproduct}>
          <label htmlFor="">product name</label>
          <Input type="text" name="product_name" onChange={handleInputValue} />

          <label htmlFor="">image url</label>
          <Input
            type="file"
            style={{
              border: 'none',
            }}
            name="image_url"
            onChange={changeHandler}
          />

          <label htmlFor="">price</label>
          <Input type="number" name="price" onChange={handleInputValue} />

          <label htmlFor="">quantity</label>
          <Input type="number" name="quantity" onChange={handleInputValue} />

          <label htmlFor="">category</label>
          <Select id="" name="category" onChange={handleInputValue}>
            <option value="">select category</option>
            <option value="shirt">shirt</option>
            <option value="jeans">jeans</option>
            <option value="top">top</option>
          </Select>

          <label htmlFor="">discount</label>
          <Input type="number" name="discount" onChange={handleInputValue} />

          <Input type="submit" value="Add Product" />
        </form>
      </div>
    </div>
  )
}

export default Form
