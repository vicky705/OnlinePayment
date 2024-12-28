import tShart from '../assets/Images/t-shart.png'

interface Props {
  makeOrderHandler : () => void
}

const ProductCard = ( {makeOrderHandler} : Props) => {
  return (
    <div className='w-[400px] bg-black rounded-lg shadow-md p-4 relative'>
      <div className='mt-[-100px]'>
        <img src={tShart} alt='T-Shart' />
      </div>
      <div className='py-2'>
        <h1 className='font-bold'>T-Shart</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veritatis natus quis numquam debitis beatae, repudiandae tenetur soluta eius sint!</p>
        <h2 className='mt-4 font-bold'>$ 300 /-</h2>
      </div>
      <div className='flex justify-center py-2 mt-4'>
        <button className='border-blue-600 font-bold py-2 px-4 rounded-sm bg-blue-600' onClick={makeOrderHandler}>But Now</button>
      </div>
    </div>    
  )
}

export default ProductCard