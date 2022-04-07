import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Search } from 'react-feather'

// constants
import { cities, categories, postsCount } from '@/constants'

// components
import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'

// types
import { DropdownData } from '@/types/dropdown'
import { Bank } from '@/types/bank'

// helper functions
import { handleSearch } from './DashboardLayout.helpers'

// hooks
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'

interface Props {
    pageName: string
    allBanksList: Bank[]
    loading: boolean
    city: typeof cities[0]
    setCity: Dispatch<SetStateAction<DropdownData>>
}

const DashboardLayout: React.FC<Props> = ({
    pageName,
    allBanksList,
    loading,
    city,
    setCity,
}) => {
    // table usestates
    const [tableData, setTableData] = useState<Bank[]>([])

    // dropdown usestates
    const [category, setCategory] = useState(categories[0])

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(postsCount[0])

    const lastBankIndex = currentPage * Number(postsPerPage.value)
    const firstBankIndex = lastBankIndex - Number(postsPerPage.value)
    const defaultTableData = allBanksList.slice(firstBankIndex, lastBankIndex)

    // Change Page
    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber)
    }

    // Handle dropdown selection
    function handleDropdown(data: DropdownData, type: string) {
        if (type.toLowerCase() === 'city') {
            setCity(data)
            setCurrentPage(1)
        } else if (type.toLowerCase() === 'rows') {
            setPostsPerPage(data)
        } else {
            setCategory(data)
        }
    }

    useEffect(() => {
        setTableData(defaultTableData)
    }, [allBanksList, postsPerPage, defaultTableData])

    return (
        <>
            <main>
                <Sidebar />

                <section className="w-[calc(100vw - 208px)] px-14 py-8 ml-52 ">
                    <div className="flex items-center justify-between pb-4 mb-8">
                        <h2 className="text-2xl font-bold ">{pageName}</h2>

                        <div>
                            <div className="flex items-center px-4 overflow-hidden border rounded-full border-neutral-400 group focus-within:border-blue-600">
                                <Search
                                    width={18}
                                    height={18}
                                    className="transition stroke-neutral-400 group-focus-within:stroke-blue-600"
                                />

                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Search"
                                    className="h-10 px-4 transition-all duration-300 ease-in-out w-60 focus:w-72"
                                    onChange={(e) =>
                                        handleSearch(
                                            e,
                                            firstBankIndex,
                                            lastBankIndex,
                                            allBanksList,
                                            defaultTableData,
                                            setTableData,
                                            category.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center my-8">
                            <div className="mr-6">
                                <Pagination
                                    totalBanks={allBanksList.length}
                                    currentPage={currentPage}
                                    setCurrentPage={paginate}
                                    firstIndex={firstBankIndex}
                                    lastIndex={lastBankIndex}
                                />
                            </div>

                            <div className="mr-6">
                                <Dropdown
                                    label="Rows"
                                    data={postsCount}
                                    selected={postsPerPage}
                                    handleSelection={handleDropdown}
                                />
                            </div>

                            <div className="mr-6">
                                <Dropdown
                                    label="City"
                                    data={cities}
                                    selected={city}
                                    handleSelection={handleDropdown}
                                />
                            </div>

                            <div className="mr-6">
                                <Dropdown
                                    label="Category"
                                    data={categories}
                                    selected={category}
                                    handleSelection={handleDropdown}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <Loading />
                        ) : tableData.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <Table data={tableData} />
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}

export default DashboardLayout
