import { GlobalProvider } from '@/context/global.context'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <GlobalProvider initialProps={{ banks: [], favorites: [] }}>
            <Component {...pageProps} />
        </GlobalProvider>
    )
}

export default MyApp
