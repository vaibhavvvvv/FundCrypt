import React, {useState} from 'react'

const Hero = ({titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title:"",
    description:"",
    amount:"",
    deadline:"",
  })

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try{
      const data = await createCampaign(campaign)
      alert("Your Campaign is created")
      window.location.reload();
    } catch(error) {
      console.log(error)
      alert("Make sure you've connected your wallet", error )
    }
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>
      <div className="relative bg-opacity-75 backgroundMain">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60"></div>
        
        {/* Wave SVG */}
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>

        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                FundCrypt <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Web3 Crowdfunding
                </span>
              </h2>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 rounded-full border border-gray-500 backdrop-blur-sm">
                  Blockchain Powered
                </span>
                <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 rounded-full border border-gray-500 backdrop-blur-sm">
                  AI Assistant
                </span>
                <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 rounded-full border border-gray-500 backdrop-blur-sm">
                  Polygon Network
                </span>
                <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 rounded-full border border-gray-500 backdrop-blur-sm">
                  Transparent
                </span>
              </div>
              
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                A decentralized crowdfunding platform where creators can raise funds directly from supporters using blockchain technology, with AI-powered assistance to help you navigate the world of Web3 fundraising.
              </p>
              
              {/* Feature list */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-200">Smart contract-based campaigns for security and transparency</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-200">AI-powered chat assistant to help with your questions</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-200">Telegram bot integration for campaign updates</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <a
                  href="https://x.com/godreaperrr/"
                  className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 bg-black rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                >
                  Twitter Agent
                </a>
                <a
                  href="https://t.me/machupicchuaid_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-gray-200 hover:text-white"
                >
                  Telegram Bot
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded-lg shadow-2xl shadow-gray-600/30 p-7 sm:p-10 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-bold text-center sm:text-2xl">
                  Create Your Campaign
                </h3>
                <p className="mb-4 text-sm text-gray-600 text-center">
                  Launch your fundraising campaign on the blockchain in minutes
                </p>
                <form>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="title"
                      className="inline-block mb-1 font-medium"
                    >
                      Title
                    </label>
                    <input 
                      onChange={(e)=> 
                        setCampaign({...campaign, title: e.target.value})
                      }
                      placeholder="Campaign Title"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 border rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline hover:bg-gray-50"
                      id="title"
                      name="title"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="description"
                      className="inline-block mb-1 font-medium"
                    >
                      Description
                    </label>
                    <textarea 
                      onChange={(e)=> 
                        setCampaign({...campaign, description: e.target.value})
                      }
                      placeholder="Describe your campaign"
                      required
                      rows="3"
                      className="flex-grow w-full px-4 mb-2 transition duration-200 bg-white border-gray-300 border rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline hover:bg-gray-50"
                      id="description"
                      name="description"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="amount"
                      className="inline-block mb-1 font-medium"
                    >
                      Target Amount (ETH)
                    </label>
                    <input 
                      onChange={(e)=> 
                        setCampaign({...campaign, amount: e.target.value})
                      }
                      placeholder="0.1"
                      required
                      type="text"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 border rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline hover:bg-gray-50"
                      id="amount"
                      name="amount"
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="deadline"
                      className="inline-block mb-1 font-medium"
                    >
                      Deadline
                    </label>
                    <input 
                      onChange={(e)=> 
                        setCampaign({...campaign, deadline: e.target.value})
                      }
                      placeholder="Date"
                      required
                      type="date"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 border rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline hover:bg-gray-50"
                      id="deadline"
                      name="deadline"
                    />
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      onClick={(e)=> createNewCampaign(e)}
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                    >
                      Create Campaign
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 sm:text-sm text-center">
                    Your campaign will be stored on the blockchain and visible to potential donors worldwide.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero