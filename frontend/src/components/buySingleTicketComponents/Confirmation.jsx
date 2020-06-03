import React from 'react';
import {Link} from 'react-router-dom';
function Confirmation(props) {
  return (
    <div className={props.confirmation ? 'block' : 'hidden'}>
      <div className="px-5 py-8">
        <div className="text-center">
          <h1 className="text-gray-900 font-medium text-xl mb-5">Takk for handelen!</h1>
          <p className="mb-16 text-gray-700 text-sm">Takk for at du velger å reise med oss. Visste du at du nå kan dele billettene du har kjøpt med venner og bekjente?</p>
        </div>
        <button onClick={props.renderSendTicket}
          className="w-full p-3 bg-vy-green-200 text-center text-sm font-medium text-vy-green-300 rounded-md mb-2">
          Send billetter til venner
        </button>
        <Link 
          to={'/tickets'} 
          onClick={props.endTransaction} 
          className="w-full block p-3 bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400"
        >
          Se billettene
        </Link>
      </div>
    </div>
  );
    
  
}

export default Confirmation;