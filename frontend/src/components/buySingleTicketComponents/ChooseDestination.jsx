import React from 'react';
function ChooseDestination(props) {
    return (
        <div className={props.chooseDestination ? "block" : "hidden"}>
            <div>
                <div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={props.hideBuySingleTicket}>
                    <svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
                    <p className="text-sm font-medium">Tilbake til billettvalg</p>
                </div>
                <div className="pl-5 pr-5 pb-5">
                    <p className="text-sm font-medium pb-1 text-gray-800">Avreise og destinasjon</p>
                    <input className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Avreise" onChange={e => props.setStartPoint(e.target.value)}/>
                    <input className="px-3 py-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Destinasjon" onChange={e => props.setEndPoint(e.target.value)} />
                </div>
            </div>
            <div className="px-5">
                <p className="text-sm font-medium pb-1 text-gray-800">Når vil du reise?</p>
            </div>{" "}
            <div className="px-5">
                <div className="rounded-md mb-3 p-1 flex flex-row w-auto bg-gray-300">
                    <button className="w-full bg-transparent p-2 rounded text-sm font-medium text-gray-700">Nå</button>
                    <button className="w-full bg-white mx-1 p-2 rounded text-sm font-medium text-gray-700">Ankomst</button>
                    <button className="w-full bg-transparent p-2 rounded text-sm font-medium text-gray-700">Avgang</button>
                </div>
                <div className="relative flex flex-row space-between mb-5">
                    <input type="date" className="py-2 pl-8 mr-2 w-2/3 border rounded border-gray-400 text-sm text-gray-700" placeholder="Dato" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                        <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <input type="time" className="py-2 pl-8 w-1/3 border rounded border-gray-400 text-sm text-gray-700" placeholder="Tid" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-20 text-gray-700">
                        <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                </div>
            </div>
            <div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
                <button onClick={props.continueToDepartures}
                        className="p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
                        Fortsett til avganger og billetter
                </button>
            </div>
      </div>
    );    
}

export default ChooseDestination;