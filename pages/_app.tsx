import type { AppProps } from 'next/app'

import { cities } from '@/constants'
import { GlobalProvider } from '@/context/global.context'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <GlobalProvider
            initialProps={{ banks: [], favorites: [], city: cities[0] }}
        >
            <Component {...pageProps} />
        </GlobalProvider>
    )
}

export default MyApp
