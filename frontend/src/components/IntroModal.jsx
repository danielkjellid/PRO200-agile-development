import React, { Component } from 'react';
class IntroModal extends Component {
    state = {  }
    render() {
        
        return (
            <div className="mx-5 absolute bottom-0">
				<div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
					
					<h2 className="text-lg font-medium mb-6">Intro modal</h2>
					<p className="text-xs text-gray-700 mb-6">
						Intro modal
					</p>
					<div className="">
						<p className="text-left text-xs font-medium pb-1 text-gray-800">
							Telefon
						</p>
					</div>
				</div>
				<button
					className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6"
					onClick={this.props.closeIntroModal}
				>
					Lukk
				</button>
			</div>
        );
    }
}

export default IntroModal;