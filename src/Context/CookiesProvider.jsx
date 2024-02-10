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



