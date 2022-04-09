import { useToggleFavorite } from '@/hooks/useFavorite'
import { Bank } from '@/types/bank'
import { Heart } from 'react-feather'
import Hyperlink from '../Hyperlink'

interface Props {
    data: Array<Bank>
}

const Table: React.FC<Props> = ({ data }) => {
    const toggleFavorite = useToggleFavorite()

    return (
        <table className="w-full overflow-hidden text-sm border-collapse table-fixed">
            <thead className="text-left border-y bg-neutral-100 border-neutral-200">
                <tr>
                    <th className="w-8 px-2 py-1 font-medium text-neutral-500">
                        <button className="p-1">
                            <Heart
                                width={18}
                                height={18}
                                strokeWidth={1.5}
                                className="fill-white stroke-neutral-400 hover:stroke-red-500"
                            />
                        </button>
                    </th>

                    <th className=" w-[280px] py-1 px-8 font-medium text-neutral-600">
                        Bank Name
                    </th>

                    <th className="w-[150px] py-1 px-8 font-medium text-center first-letter:capitalize text-neutral-600">
                        IFSC
                    </th>

                    <th className="w-[200px] py-1 px-8 font-medium text-neutral-600">
                        Branch
                    </th>
                    <th className="px-8 py-1 font-medium text-neutral-600">
                        Address
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((bank) => (
                    <tr key={bank.ifsc} className="border-b border-neutral-200">
                        <td className="px-2 py-2 lowercase first-letter:capitalize">
                            <button
                                className="p-1"
                                onClick={() => toggleFavorite(bank.ifsc)}
                            >
                                <Heart
                                    width={18}
                                    height={18}
                                    strokeWidth={1.5}
                                    className={
                                        bank.favorite
                                            ? 'fill-red-500 stroke-red-500'
                                            : 'fill-white stroke-neutral-400 hover:stroke-red-500'
                                    }
                                />
                            </button>
                        </td>

                        <td className="px-8 py-2 lowercase first-letter:capitalize">
                            <Hyperlink href={`/bank-details/${bank.ifsc}`}>
                                {bank.bank_name}
                            </Hyperlink>
                        </td>
                        <td className="px-8 py-2 first-letter:capitalize">
                            <Hyperlink href={`/bank-details/${bank.ifsc}`}>
                                {bank.ifsc}
                            </Hyperlink>
                        </td>
                        <td className="px-8 py-2 lowercase first-letter:capitalize">
                            {bank.branch}
                        </td>
                        <td className="px-8 py-2 lowercase first-letter:capitalize">
                            {bank.address}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
