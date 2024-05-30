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

  const [allCampaign, setAllCampaign] = useState()
  const [userCampaign, setUserCampaign] = useState()

  useEffect(()=>{
    const getCampaignsData = getCampaigns()
    const getUserCampaignsData =  getUserCampaigns()

    return async () => {
      const allData = await getCampaignsData
      const userData = await getUserCampaignsData
      setAllCampaign(allData)
      setUserCampaign(userData)
      console.log("usercampaign: ", userData)
    }
  },[])

  //DOnate modal popup
  const [openModal, setOpenModal] =useState(false);
  const [donateCampaign, setDonateCampaign] = useState()

  console.log(donateCampaign)

  return (
    <>
      < Hero titleData={titleData} createCampaign={createCampaign} />

      < Card 
        title = "All Listed Campaigns"
        allCampaign ={allCampaign}
        setOpenModal={setOpenModal}
        setDonate = {setDonateCampaign}
      />

      < Card 
        title="Your Created Campaigns"
        allCampaign={userCampaign}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />

      {openModal && (
        < PopUp  
          setOpenModal={setOpenModal}
          getDonations = {getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index