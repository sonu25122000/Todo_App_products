import React, { useEffect, useState } from 'react'
import '../style/Displayproduct.css'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
function DisplayProduct() {
  const [productDetails, setproductDetails] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ProductData, setProductData] = useState({})
  //   function to get the product list
  const getProductDeatils = async () => {
    try {
      let response = await fetch(`http://localhost:3000/product`)
      let data = await response.json()
      setproductDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductDeatils()
  }, [])

  //   function to delete the products detsils from the table
  const DeleteProductFromTable = async (id) => {
    try {
      await fetch(`http://localhost:3000/product/${id}`, {
        method: 'DELETE',
      })
      alert('product deleted ')
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
  }

  // function sort by Price
  const handleSortByprice = async (e) => {
    let selected = e.target.value
    try {
      let response = await fetch(
        `http://localhost:3000/product?_sort=price&_order=${selected}`,
      )
      let data = await response.json()
      setproductDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  // function sort by quantity
  const handleSortByQuantity = async (e) => {
    let selected = e.target.value
    try {
      let response = await fetch(
        `http://localhost:3000/product?_sort=quantity&_order=${selected}`,
      )
      let data = await response.json()
      setproductDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  //   function to read form input value
  const handleInputValue = (e) => {
    const { name, value } = e.target
    setProductData({
      ...ProductData,
      [name]: e.target.type === 'number' ? +value : value,
    })
  }

  //  function to update product details
  const UpadteProductDeatils = async (id) => {
    try {
      await fetch(`http://localhost:3000/product/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(ProductData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Heading className="heading">Product Details</Heading>

      <div className="filterForm">
        <Select name="" id="sort" onChange={handleSortByprice}>
          <option value="">Sort By Price</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Select>
        <Select name="" id="sort" onChange={handleSortByQuantity}>
          <option value="">Sort By Quantity</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Select>
      </div>

      <table>
        <thead>
          <tr>
            <th>SN.</th>
            <th>Product image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Discount(%)</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {productDetails?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{ width: '30px', height: '30px' }}
                    src={item.image_url}
                    alt=""
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{item.discount}</td>
                <td
                  onClick={() => DeleteProductFromTable(item.id)}
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  <Button>Delete</Button>
                </td>
                <td>
                  <Button onClick={onOpen}>Edit</Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <FormLabel>product name</FormLabel>
                          <Input
                            onChange={handleInputValue}
                            type="text"
                            name="product_name"
                            placeholder="First name"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>image url</FormLabel>
                          <Input
                            name="image_url"
                            onChange={handleInputValue}
                            type="url"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>price</FormLabel>
                          <Input
                            name="price"
                            onChange={handleInputValue}
                            type="number"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>quantity</FormLabel>
                          <Input
                            name="quantity"
                            onChange={handleInputValue}
                            type="number"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>category</FormLabel>
                          <Select
                            name="category"
                            placeholder="Select option"
                            onChange={handleInputValue}
                          >
                            <option value="shirt">shirt</option>
                            <option value="jeans">jeans</option>
                            <option value="top">top</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>discount</FormLabel>
                          <Input name="discount" onChange={handleInputValue} />
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          onClick={() => UpadteProductDeatils(item.id)}
                          colorScheme="blue"
                          mr={3}
                        >
                          Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayProduct
