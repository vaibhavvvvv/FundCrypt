import React from 'react'

const Footer = () => {

  const productList = ["Market", "ERC 20 Token", "Donation"];
  const contactList = [ " vaibhavng7@gmail.com", "punarvpawade17@gmail.com", "ommore501@gmail.com", "Contact us"]
  const usefullLink =[ "Home", "About Us", "Company Info"]

  return (
    <footer class="text-center text-white backgroundMain lg:text-left " >
      <div class="mx-6 py-8 text-center md:text-left" >
        <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4 " >
          <div class="" >
            <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start " >
              Vaibhav Gadhave
            </h6>
            <p>A Web3 crowdfunding marketplace is a decentralized platform where creators can raise funds for their projects directly from supporters using blockchain technology.</p>
          </div>

          <div class="" >
            <h6 class="mb-4 flex justify-center font-semibold uppercase md:justify-start " >
              Products
            </h6>
            {productList.map((el,i)=>(
              <p class="mb-4" key={i+1} >
                <a href='#!' >{el} </a>
              </p>
            ))}
          </div>

          <div class="" >
            <h6 class="mb-4 flex justify-center font-semibold uppercase md:justify-start " >
              Usefull Links
            </h6>
            {usefullLink.map((el,i)=>(
              <p class="mb-4" key={i+1} >
                <a href='#!' >{el} </a>
              </p>
            ))}
          </div>

          <div class="" >
            <h6 class="mb-4 flex justify-center font-semibold uppercase md:justify-start " >
              COntacts
            </h6>
            {contactList.map((el,i)=>(
              <p class="mb-4" key={i+1} >
                <a href='#!' >{el} </a>
              </p>
            ))}

          </div>
        </div>
      </div>
      
      <div class="backgroundMain p-6 text-center " >
        <span>© 2024 Copyright: </span>
        <a class="font-semibold" href='https://taialwind-elements.com/' >
          Vaibhav Gadhave
        </a>
      </div>
    </footer>
  );
};

export default Footer