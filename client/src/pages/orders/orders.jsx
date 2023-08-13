import React from 'react'
import "./orders.scss"
import { Link, useNavigate} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Spinner from "../../components/spinner/spinner"

function Orders() {
  const navigate=useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const { isLoading, error, data } = useQuery({ // we use  this to query + to use is variables data , error ...
  queryKey: ["orders"],
  queryFn: () =>
    newRequest.get(`/order/get`).then((res) => {
      return res.data;
    }),
});

const handleContact = async (order) =>{
  const sellerId = order.sellerId;
  const buyerId = order.buyerId;
  const id =  sellerId + buyerId;
  try {
    const res = await newRequest.get(`/conversation/single/${id}`)
      navigate(`/message/${res.data.id}`)
  } catch (error) {
      if(error.response.status(404)){
        const res = await newRequest.post(`/conversation/add`,{to:currentUser.isSeller ? buyerId :sellerId,})

      }
      navigate(`/message/${res.data.id}`)
  }
  

}
  return (
    <div className='orders'>
{ isLoading ?
    <Spinner/> 
    : error ?("error")
    :(
    <div className="container">
            <div className="title">
          <h1>Orders</h1>

        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
        </table>
      </div>)}
    </div>
  )
}

export default Orders
