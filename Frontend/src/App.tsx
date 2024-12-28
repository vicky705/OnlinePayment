import ProductCard from "./Components/ProductCard";
import { useState } from "react";
import { setting } from "./Config/Setting";
import { Bounce, toast, ToastContainer } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any; 
  }
}

const App = () => {
  const [amount, setAmount] = useState<number>(300);
  const [name, setName] = useState<string>("Vicky Kumar");
  
  
  const makeOrderHandler = async () => {
    const response = await fetch(`${setting.BASE_URL}/payment/create`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        amount
      })
    })
    const data = await response.json();
    if(response.status !== 200){
      return toast.error(data.message)
    }
    handlePaymentVerify(data.order)
    console.log({data})
  }

  
  const handlePaymentVerify = async (data : any) => {
    const option = {
      key : setting.SECRET,
      amount,
      currency : data.currency,
      name,
      description : "This is test payment",
      order_id : data.id,
      handler : async (response : any ) => {
        try{
          const res = await fetch(`${setting.BASE_URL}/payment/verify`, {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          })
          const verifyData = await res.json()
          if(res.status !== 200){
            return toast.error(verifyData.message)
          }
          console.log({verifyData})
          toast.success(verifyData.message)
        }
        catch (error) {
          console.log({error})
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(option);
    rzp1.open();
  }


  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />
      <section className="flex justify-center items-center h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <main>
            <ProductCard makeOrderHandler={makeOrderHandler} />
        </main>
      </section>
    </>
  );
}

export default App;