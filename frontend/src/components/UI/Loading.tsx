import { Spinner } from '@material-tailwind/react'
import React from 'react'

interface Props {
    isLoading: boolean
}

const Loading: React.FC<Props> = ({ isLoading }) => {

    return <> {
        isLoading && <Spinner color='blue' />
    } </>
}

export default Loading