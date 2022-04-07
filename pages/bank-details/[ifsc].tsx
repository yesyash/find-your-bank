import Bank from '@/components/_pages/Bank'
import { GetServerSideProps } from 'next'

export default Bank

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}
