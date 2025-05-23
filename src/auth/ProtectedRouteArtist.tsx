import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "./AuthenticationContext";

export default function ProtectedRoutesArtist() {

    const navigate = useNavigate()

    const { claims } = useAuthenticationContext();
    const isUser = claims.findIndex(claim => claim.name === 'role' && claim.value === 'artist') > -1;
    return isUser ? <Outlet /> : <> {isUser ? 'True' : navigate('login')} </>;
}
