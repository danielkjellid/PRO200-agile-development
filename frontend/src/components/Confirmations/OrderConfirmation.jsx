// framework imports
import React from 'react';
import {Link} from 'react-router-dom';


// confirmation message after completing an order
function OrderConfirmation(props) {

    let totalPriceOrder = 0;

    return (
        <div className={props.confirmation ? 'block' : 'hidden'}>
            <div className="px-5 pb-5">
                <div className="text-center">
                    <h1 className="text-gray-900 font-medium text-xl">Takk for handelen!</h1>
                    <p className="mt-5 text-gray-700 text-sm">Takk for at du velger å reise med oss. Visste du at du nå kan dele billettene du har kjøpt med venner og bekjente?</p>
                </div>
                <div className="mt-5 pb-5 border-b border-gray-300">
                    <div className="py-2">
                        {
                            props.numberOfTravellers.map((item, index) => {
                                if (item.number > 0) {
                                    totalPriceOrder += item.totalPrice()
                                    
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <p className="font-regular text-gray-900 text-sm">{item.number} {item.type}</p>
                                            <p className="font-medium text-gray-900 text-sm">kr {item.totalPrice()}</p>
                                        </div>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
                <div className="my-5">
                    <div className="py-2">
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 text-sm">Total <span className="text-gray-600 font-normal">(inkl MVA)</span></p>
                            <p className="font-medium text-gray-900 text-sm">kr {totalPriceOrder}</p>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-900 text-sm">Herav MVA</p>
                            <p className="text-gray-900 text-sm">kr 53,76</p>
                         </div>
                    </div>
                 </div>
                <Link 
                    to={'/tickets'} 
                    onClick={() => {props.endTransaction(); props.updateAPI();}} 
                    className="w-full block p-3 bg-vy-green-200 text-center text-sm font-medium text-vy-green-300 rounded-md hover:bg-vy-green-100 mb-2"
                >
                Se billettene

                </Link>
                <button onClick={props.renderSendTicket}
                    className="w-full p-3 bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
                    Send billetter til andre
                </button>
            </div>
        </div>
    );
}

export default OrderConfirmation;