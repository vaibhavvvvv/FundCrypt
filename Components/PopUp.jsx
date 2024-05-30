import React, { useEffect, useState } from 'react'

const PopUp = ({setOpenModal, getDonations, donate, donateFunction  }) => {
  const [amount, setAmount] = useState("");
  const[allDonationsData, setAllDonationsData] = useState();

  const createDonation = async() =>{
    try{
      const data =  await donateFunction(donate.pId, amount);
      alert("Donatiom Submitted Successfully")
      window.location.reload();    
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("donate", donate)
    const donationsList = getDonations(donate.pId)
    console.log("list", donationsList)
    return async() =>{
      const donationData =  await donationsList;
      setAllDonationsData(donationData)
    }
  }, [])
  


  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  ' >
        <div className=' relative w-auto my-6 mx-auto max-w-3xl ' >
          <div className=' border mx-4 text-white bg-black border-gray-200 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none ' >
            <div className=' flex items-start justify-between  p-5 border-b border-solid border-white rounded-t ' >
              <h3 className=' text-3xl font-semibold ' >
                {donate.title}
              </h3>
              <button className=''
                onClick={() => setOpenModal(false)}
              >
                <span className='font-bold text-2xl' >x</span>
              </button>
            </div>
            {/* body */}
            <div className='relative p-6 flex-auto ' >
              <p className=' my-4 text-white text-lg leading-relaxed ' >
                {donate.description}
              </p>

              <p className=' my-4 text-white text-sm leading-relaxed ' >
                Enter Donation amount in ETH :
              </p>

              <input 
                onChange={(e)=>{setAmount(e.target.value)}}
                placeholder='amount'
                required
                type='text'
                className=' flex-grow w-full h-12 px-4 mb-12 transition duration-200 bg-gray-950 border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline '
                id='firstName'
                name='firstName'
              />

              {/* {allDonationsData?.map((donate,i)=>(
                <p className='my-4 text-white text-lg leading-relaxed ' >
                  {i+1}: {donate.donation} {""}
                  {donate?.donator?.slice(0,35)}
                </p>
              ))} */}

            {allDonationsData?.map((donate, i) => (
              <div className="bg-gray-900 rounded p-3">
                <div className="flex mt-2">
                    <span className="font-bold text-white mr-2">Donation {i + 1}:</span>
                    <span className="text-white overflow-y-auto overflow-x-auto ">{donate.donation} ETH</span>
                  </div>
                {donate?.donator && (
                  <div className="flex mt-2">
                    <span className="font-bold text-white mr-2">Donator :</span>
                    <span className="text-white overflow-y-auto overflow-x-auto ">{donate.donator.slice(0,22)}...</span>
                  </div>
                )}
              </div>
            ))}


            </div>

            {/* footer */}
            <div className=' flex items-center justify-end p-6 border-t border-solid border-slalt-200 rounded-b ' >
              <button 
                className='text-black rounded  background-transparent bg-red-500 hover:bg-red-400 font-bold uppercase px-6 py-2 text txt-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 '
                type='button'
                onClick={()=>setOpenModal(false)}
              >Close</button>

              <button 
                className=' background text-white active:bg-emerald-600 hover:bg-violet-900 rounded font-bold uppercase text-sm px-6 py-3 roundd shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ' 
                type='button'
                onClick={()=> createDonation()}
              >
                Donate
              </button>
            </div>
          </div> 
        </div>
      </div>
      <div className='opacity-75 fixed inset-0 z-40 bg-black' ></div>
    </>
  )
}

export default PopUp