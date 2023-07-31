import jwtDecode from "jwt-decode"

let localUser = {}
if(window.localStorage.getItem('token')){
    localUser= jwtDecode(window.localStorage.getItem('token'))
}
export const BASE_URL ="http://localhost:5000"
export const LOCAL_USER= localUser