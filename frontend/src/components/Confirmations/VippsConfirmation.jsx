// framework imports
import React from 'react';


// conformation if user selects to split the bill through vipps
function VippsConfirmation(props) {

    return (
        <div className={props.makeAccountInVIpps ? 'block' : 'hidden'}>
            <div className="py-5 px-8 mx-auto text-center">
                <h1 className="font-medium text-2xl text-gray-900">Oppgjør i vipps</h1>
                <p className="mt-6 text-gray-700 text-sm">
                    Vi holder på å opprette et oppgjør i Vipps for deg. Oppgjøret deles likt på alle, dersom du ønsker å endre dette gjøres dette i selve oppgjøret i Vipps. Du vil automatisk bli sendt til Vipps snart.
                </p>
            </div>
        </div>
    );
}

export default VippsConfirmation;