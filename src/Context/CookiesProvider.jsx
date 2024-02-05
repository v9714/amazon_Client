// import React, { createContext, useState } from "react";

// export const CookieContext = createContext({});

// export const CookieProvider = (props) => {
//     const [cookies, setCookies] = useState({});



//     return (
//         <CookieContext.Provider value={{ cookies, setCookies }}>
//             {props.children}
//         </CookieContext.Provider>
//     );
// };


import { CookieContext } from "./Cookies";
import { useCookies } from "react-cookie";


export const CookieProvider = (props) => {
    const [cookiess, setCookiess] = useCookies(["user"]);

    return (
        <CookieContext.Provider value={{ cookiess, setCookiess }}>
            {props.children}
        </CookieContext.Provider>
    );
};



