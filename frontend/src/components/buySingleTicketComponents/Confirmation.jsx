import React from 'react';
import {Link} from 'react-router-dom';
function Confirmation(props) {
  return (
    <div className={props.confirmation ? 'block' : 'hidden'}>
      <div className="px-5 pb-5">
        <div className="text-center">
          <h1 className="text-gray-900 font-medium text-xl">Takk for handelen!</h1>
          <p className="mt-5 text-gray-700 text-sm">Takk for at du velger å reise med oss. Visste du at du nå kan dele billettene du har kjøpt med venner og bekjente?</p>
        </div>
        <div className="mt-5 pb-5 border-b border-gray-300">
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* trenger NumberOfTravellers for å vise hvilke billetter som er valgt tidligere */}
              <p className="font-regular text-gray-900 text-sm">1 Voksen</p>
              <p className="font-medium text-gray-900 text-sm">kr 109,00</p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* Totalbeløp må regnes ut ved hjelp av billettpriser */}
              <p className="font-medium text-gray-900 text-sm">Total <span className="text-gray-600 font-normal">(inkl MVA)</span></p>
              <p className="font-medium text-gray-900 text-sm">kr 672,00</p>
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-900 text-sm">Herav MVA</p>
              <p className="text-gray-900 text-sm">kr 53,76</p>
            </div>
          </div>
        </div>
        <button onClick={props.renderSendTicket}
          className="w-full p-3 bg-vy-green-200 text-center text-sm font-medium text-vy-green-300 rounded-md mb-2">
          Send billetter til venner
        </button>
        <Link 
          to={'/tickets'} 
          onClick={() => {props.endTransaction(); props.updateAPI();}} 
          className="w-full block p-3 bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400"
        >
          Se billettene
        </Link>
      </div>
    </div>
  );
    
  
}

export default Confirmation;