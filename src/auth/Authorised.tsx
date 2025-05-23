import { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorised(props: authorisedProps) {

    const [isAuthorised, setIsAuthorised] = useState(false)
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {
        if (props.role) {
            const index = claims.findIndex(claim =>
                claim.name === 'role' && claim.value === props.role)
            setIsAuthorised(index > -1)
        } else {
            setIsAuthorised(claims.length > 0)
        }
    }, [claims, props.role])

    return (
        <>
            {isAuthorised ? props.authorised : props.notAuthorised}
        </>
    )
}

interface authorisedProps {
    authorised?: ReactElement;
    notAuthorised?: ReactElement;
    role?: string;
}