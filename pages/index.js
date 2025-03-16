import React, {useContext, useState, useEffect} from 'react'
import { CrowdFundingContext } from '@/Context/CrowdFunding'
import {Hero, Card, PopUp} from "@/Components"

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState(null)
  const [userCampaign, setUserCampaign] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const allData = await getCampaigns()
        const userData = await getUserCampaigns()
        
        setAllCampaign(allData)
        setUserCampaign(userData)
        console.log("usercampaign: ", userData)
      } catch (error) {
        console.error("Error fetching campaign data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  //Donate modal popup
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState()

  console.log(donateCampaign)

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      {isLoading ? (
        <div className="text-center py-10">Loading campaigns...</div>
      ) : (
        <>
          <Card 
            title="All Listed Campaigns"
            allCampaign={allCampaign}
            setOpenModal={setOpenModal}
            setDonate={setDonateCampaign}
          />

          <Card 
            title="Your Created Campaigns"
            allCampaign={userCampaign}
            setOpenModal={setOpenModal}
            setDonate={setDonateCampaign}
          />
        </>
      )}

      {openModal && (
        <PopUp  
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index