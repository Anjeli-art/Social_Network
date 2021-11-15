import React, {ComponentType} from 'react';
import {Preloader} from "../common/preloader/Preloader";


export const WithSuspense=(Component:ComponentType)=>{////////////////типизация
    return ({...restProps}) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...restProps}/>
        </React.Suspense>
    }
}
;