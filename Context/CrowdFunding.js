import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig, ConnectKitButton } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//INTERNAL IMPORT   
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";

const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

// Create a client
const queryClient = new QueryClient();

// Polygon Amoy chain configuration
const polygonAmoy = {
  id: 80002,
  name: 'Polygon Amoy',
  network: 'polygon-amoy',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc-amoy.polygon.technology/'] },
    default: { http: ['https://rpc-amoy.polygon.technology/'] },
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://amoy.polygonscan.com' },
  },
  testnet: true,
};

// Create Wagmi config with ConnectKit
const config = createConfig(
  getDefaultConfig({
    appName: "FundCrypt",
    walletConnectProjectId: "YOUR_PROJECT_ID", // Get from https://cloud.walletconnect.com
    chains: [polygonAmoy],
  }),
);

export const CrowdFundingContext = React.createContext(null);

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "crowd funding contract";
    const [currentAccount, setCurrentAccount] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    
    const createCampaign = async(campaign)=>{
        const {title, description, amount, deadline} = campaign
        
        if (!isConnected || !currentAccount) {
            console.log("Please connect wallet first");
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount,18),
                new Date(deadline).getTime()
            );

            await transaction.wait();

            console.log("contract called successfully", transaction )
        } catch(error){
            console.log("contract call failure", error)
        }
    }    

    const getCampaigns = async() => {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");
        const contract = fetchContract(provider)

        const campaigns =  await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i)=> ({
            owner: campaign.owner,
            title : campaign.title,
            description : campaign.description,
            target : ethers.utils.formatEther(campaign.target.toString()),
            deadline : campaign.deadline.toNumber(),
            amountCollected :ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));
        console.log("parsedCampaigns", parsedCampaigns);
        return parsedCampaigns;
    }
        

    const getUserCampaigns = async() => {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => 
                campaign.owner.toLowerCase() == currentUser.toLowerCase()
        );

        const userData = filteredCampaigns.map((campaign, i)=>({
            owner: campaign.owner,
            title : campaign.title,
            description : campaign.description,
            target : ethers.utils.formatEther(campaign.target.toString()),
            deadline : campaign.deadline.toNumber(),
            amountCollected :ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));

        return userData;
    };

    const donate = async (pId, amount) => {
        if (!isConnected || !currentAccount) {
            console.log("Please connect wallet first");
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const campaignData = await contract.donateToCampaign(pId, {
                value : ethers.utils.parseEther(amount),
            });
                
            await campaignData.wait();
            location.reload();

            return campaignData;
        } catch (error) {
            console.log("Error donating to campaign:", error);
        }
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations =donations[0].length;

        const parsedDonations = [];

        for (let i =0; i < numberOfDonations; i++){
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    };

    // Check if wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return;
            
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                setIsConnected(true);
            } else {
                setIsConnected(false);
                setCurrentAccount("");
            }
        } catch (error) {
            console.log("Something wrong while connecting to wallet:", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
        
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                    setIsConnected(true);
                } else {
                    setCurrentAccount('');
                    setIsConnected(false);
                }
            });
        }
        
        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <WagmiConfig config={config}>
                <ConnectKitProvider>
                    <CrowdFundingContext.Provider
                        value={{
                            titleData,
                            currentAccount,
                            isConnected,
                            createCampaign,
                            getCampaigns,
                            getUserCampaigns,
                            donate,
                            getDonations,
                            connectWallet: () => {}, // This will be handled by ConnectKitButton
                            disconnectWallet: () => {}, // This will be handled by ConnectKitButton
                        }}
                    >
                        {children}
                    </CrowdFundingContext.Provider>
                </ConnectKitProvider>
            </WagmiConfig>
        </QueryClientProvider>
    );
};