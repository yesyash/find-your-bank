import type { AppProps } from 'next/app'
import { BankProvider } from '@/hooks/useBank'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <BankProvider initialList={[]}>
            <Component {...pageProps} />
        </BankProvider>
    )
}

export default MyApp
