import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Search } from 'react-feather'

// constants
import { cities, categories, rows } from './Home.constants'

// components
import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'

// types
import { DropdownData } from '@/types/dropdown'
import { Bank } from '@/types/bank'

// helper functions
import { handleSearch, loadBankList } from './Home.helpers'

// hooks
import { useAddBank, useBank } from '@/hooks/useBank'

const Home: NextPage = () => {
    const { pathname } = useRouter()

    const allBanksList = useBank()
    const addBanks = useAddBank()

    // table usestates
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState<Bank[]>([])

    // dropdown usestates
    const [city, setCities] = useState(cities[0])
    const [category, setCategory] = useState(categories[0])

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(rows[0])

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
            setCities(data)
            setCurrentPage(1)
        } else if (type.toLowerCase() === 'rows') {
            setPostsPerPage(data)
        } else {
            setCategory(data)
        }
    }

    useEffect(() => {
        loadBankList(city.value, setLoading, addBanks)
    }, [city, addBanks])

    useEffect(() => {
        setTableData(defaultTableData)
    }, [allBanksList, postsPerPage])

    return (
        <>
            <main>
                <Sidebar />

                <section className="w-[calc(100vw - 208px)] px-14 py-8 ml-52 ">
                    <div className="flex items-center justify-between pb-4 mb-8">
                        <h2 className="text-2xl font-bold ">
                            {pathname === '/' ? 'All Banks' : 'Favorites'}
                        </h2>

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
                                    data={rows}
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

                        {loading ? 'Loading....' : <Table data={tableData} />}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
