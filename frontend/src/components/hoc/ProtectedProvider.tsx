import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getCookie } from '../../utils/cookies'

interface Props {
    children?: any
}

const ProtectedRouter: React.FC<Props> = (props) => {
    const location = useLocation()

    if (!getCookie('access_token')) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return props.children
}

export { ProtectedRouter }