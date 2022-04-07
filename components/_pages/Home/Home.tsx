import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// constants
import { cities, categories, rows } from './Home.constants'

// components
import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'
import Dropdown from '@/components/Dropdown'

// types
import { DropdownData } from '@/types/dropdown'

// helper functions
import { loadBankList } from './Home.helpers'
import { Search } from 'react-feather'
import Pagination from '@/components/Pagination'
import { useAddBank, useBank } from '@/hooks/useBank'

const Home: NextPage = () => {
    const { pathname } = useRouter()
    const bankList = useBank()
    const addBanks = useAddBank()

    const [loading, setLoading] = useState(false)
    const [city, setCities] = useState(cities[0])
    const [category, setCategory] = useState(categories[0])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(rows[0])

    // Get Bounded bank list
    const indexOfLastBank = currentPage * Number(postsPerPage.value)
    const indexOfFirstBank = indexOfLastBank - Number(postsPerPage.value)
    const currentBankList = bankList.slice(indexOfFirstBank, indexOfLastBank)

    // Change Page
    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber)
    }

    // Handle dropdown selection
    function handleDropdown(data: DropdownData, type: string) {
        if (type.toLowerCase() === 'city') {
            setCities(data)
        } else if (type.toLowerCase() === 'rows') {
            setPostsPerPage(data)
        } else {
            setCategory(data)
        }
    }

    useEffect(() => {
        loadBankList(city.value, setLoading, addBanks)
    }, [city, addBanks])

    return (
        <>
            <main>
                <Sidebar />

                <section className="w-[calc(100vw - 208px)] px-14 py-8 ml-52 ">
                    <div className="flex items-center justify-between pb-4 mb-8">
                        <h2 className="text-2xl font-bold ">
                            {pathname === '/' ? 'All Banks' : 'Favorites'}
                        </h2>

                        <form className="transition">
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
                                />
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className="flex items-center my-8">
                            <div className="mr-6">
                                <Pagination
                                    totalBanks={bankList.length}
                                    currentPage={currentPage}
                                    setCurrentPage={paginate}
                                    firstIndex={indexOfFirstBank}
                                    lastIndex={indexOfLastBank}
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

                        {loading ? (
                            'Loading....'
                        ) : (
                            <Table data={currentBankList} />
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
