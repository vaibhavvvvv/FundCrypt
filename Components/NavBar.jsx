import React, {useState, useEffect, useContext} from 'react'
import { ConnectKitButton } from "connectkit";

//internal imports
import { CrowdFundingContext } from '@/Context/CrowdFunding';
import {Logo, Menu} from "../Components/index";

const NavBar = () => {
  // const {ConnectKitButton} = useContext(CrowdFundingContext);
  const { currentAccount, connectWallet }  = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated menu list to include Telegram bot
  const menuList = [
    { name: "Twitter", url: "https://x.com/godreaperrr/" },
    { name: "Telegram Bot", url: "https://t.me/machupicchuaid_bot" }
  ];

  return (
    <div className="backgroundMain" >
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8" >
        <div className="relative flex items-center justify-between" >

          <div className="flex items-center"  >
            <a href='/' aria-label='Company' title='Company' className="inline-flex items-center mr-8 ">
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase ">FundCrypt</span>
            </a>
            <ul className="flex items-center space-x-8 lg:flex ">
              {menuList.map((item, i)=>(
                <li key={i+1}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={item.name} 
                    title={item.name} 
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400 flex items-center"
                  >
                    {item.name}
                    {item.name === "Telegram Bot" && (
                      <svg 
                        className="ml-1 w-4 h-4" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-3.5 8c-.828 0-1.5-.672-1.5-1.5S7.672 7 8.5 7 10 7.672 10 8.5 9.328 10 8.5 10zm7 0c-.828 0-1.5-.672-1.5-1.5S14.672 7 15.5 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-3.5 8c-3.59 0-6.5-2.91-6.5-6.5h2c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5h2c0 3.59-2.91 6.5-6.5 6.5z"/>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>          
            
          </div>
          
          <div className="flex items-center hidden space-x-8 lg:flex">
            <ConnectKitButton />
          </div>
          
          <div className="lg:hidden z-40" > 
            <button 
              aria-label='Open Menu' 
              title='Open Menu'
              className="p-2 -mr-1  transition duration-200 rounded focus:outline-none focus:shadow-outline "
              onClick={()=> setIsMenuOpen(true) }
            >
              < Menu /> 
            </button>
            { isMenuOpen && (
              <div className="absolute top-0 left-0  w-full"  >  
                <div className=" p-5 bg-white border rounded shadow-sm " >
                  <div className="flex items-center justify-between mb-4" >
                    <div>
                      <a href='/' aria-label='Company' title='Company' className="inline-flex  items-center ">
                        <Logo color="text-black" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase ">FundCrypt</span>
                      </a>
                    </div>

                    <div>
                    <button
                      aria-label="Close Menu" 
                      title='Close Menu' 
                      className=" p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-700 focus:outline-none focus:shadow-outline " 
                      onClick={()=>setIsMenuOpen(false)}
                    >
                       <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg> 
                    </button>
                  </div>  
                  </div>
                  
                  <nav>
                  <ul className="space-y-4" >
                  {menuList.map((item, i)=>(
                    <li key={i+1}>
                      <a 
                        href={item.url}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={item.name} 
                        title={item.name} 
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 flex items-center"
                      >
                        {item.name}
                        {item.name === "Telegram Bot" && (
                          <svg 
                            className="ml-1 w-4 h-4" 
                            fill="currentColor" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-3.5 8c-.828 0-1.5-.672-1.5-1.5S7.672 7 8.5 7 10 7.672 10 8.5 9.328 10 8.5 10zm7 0c-.828 0-1.5-.672-1.5-1.5S14.672 7 15.5 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-3.5 8c-3.59 0-6.5-2.91-6.5-6.5h2c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5h2c0 3.59-2.91 6.5-6.5 6.5z"/>
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                    <ConnectKitButton />
                  </ul>
                </nav>
                </div>
                
              </div>  
            ) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar