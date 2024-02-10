import { Alert } from "@mui/material"

export default function MessageBox(props) {

    const {error } = props

    return (
        <Alert className={error ? "d-flex" : "d-none"} severity="error"> <b>{error}</b> This is an error alert — check it out!</Alert>
        
    )
}