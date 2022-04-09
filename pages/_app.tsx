import { GlobalProvider } from '@/context/global.context'
import type { AppProps } from 'next/app'
// import { BankProvider } from '@/hooks/useBank'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <BankProvider initialList={[]}>
        <GlobalProvider initialProps={{ banks: [] }}>
            <Component {...pageProps} />
        </GlobalProvider>
        // </BankProvider>
    )
}

export default MyApp
