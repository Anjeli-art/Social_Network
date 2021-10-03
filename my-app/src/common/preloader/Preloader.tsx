import React from 'react';
import preloader from "../../assets/images/Spin-1s-200px.svg"



export const Preloader : React.FC= () => {
    return (
        <div>
           <img src={preloader}/>
        </div>
    );
};

