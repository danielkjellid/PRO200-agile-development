import React, { Component } from 'react';
class ChooseDestination extends Component {
    render() {
        return (
            <div className={this.props.chooseDestination ? "displayBlock" : "displayNone"}>
                <div>
                    <div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={this.props.hideBuySingleTicket}>
                        <svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
                        <p className="text-sm font-medium">Tilbake til billettvalg</p>
                    </div>
                    <div className="pl-5 pr-5 pb-5">
                        <p className="text-sm font-medium pb-1 text-gray-800">Avreise og destinasjon</p>
                        <input className="p-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Avreise" />
                        <input className="p-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Destinasjon" />
                    </div>
                </div>
                <div className="pr-5 pl-5 pb-5">
                    <p className="text-sm font-medium pb-1 text-gray-800">Når vil du reise?</p>
                </div>{" "}
                {/* this section will be developed later */}
                <div className="p-5">
                    <button onClick={this.props.continueToDepartures}
                            className="p-3 w-full bg-green-800 text-center text-sm font-medium text-white rounded-md">
                            Fortsett til avganger og billetter
                    </button>
                </div>
          </div>
        );
    }
}

export default ChooseDestination;