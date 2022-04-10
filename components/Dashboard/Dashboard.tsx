import React from 'react'
import { Search } from 'react-feather'
import Head from 'next/head'

import Sidebar from '@/components/Sidebar'
import Loading from '@/components/Loading'
import EmptyState from '@/components/EmptyState'
import Table from '@/components/Table'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'

import { useDebounce } from '@/hooks/useDebounce'
import { useAddBanks, useBank, useGetBanks } from '@/hooks/useBank'

import { Bank } from '@/types/bank'
import { DropdownData } from '@/types/dropdown'

import { categories, cities, initialState } from './Dashboard.constants'
import { handleSearch } from './Dashboard.helpers'
import { useDashboardManager } from './Dashboard.hooks'

interface Props {
    pageName: string
    banks: Bank[]
}

const Dashboard: React.FC<Props> = ({ pageName, banks }) => {
    const addBanks = useAddBanks()

    const { state, updateTable, updateCity, updateCategory, updateIndexes } =
        useDashboardManager(initialState)
    const { data, isLoading } = useGetBanks(state.city.value)

    // Handle dropdown selection
    function handleDropdown(data: DropdownData, type: string) {
        if (type.toLowerCase() === 'city') {
            updateCity(data)
        } else {
            updateCategory(data)
        }
    }

    // swr res
    React.useEffect(() => {
        if (data) {
            let finalList = data.map((bank) => ({ ...bank, favorite: false }))

            addBanks(finalList)
        }
    }, [data])

    const debouncedSearch = useDebounce(
        (e) =>
            handleSearch(
                e,
                state.category.value,
                state.indexes,
                banks,
                updateTable
            ),
        500
    )

    return (
        <>
            <Head>
                <title>{pageName} - FYB</title>
            </Head>

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
                                    onChange={debouncedSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <h4>
                        To see working of the proxy api{' '}
                        <a
                            href="http://localhost:3000/api/bank?city=BANGLORE&ifsc=JAKA0ZOBANG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mb-8 text-blue-600 underline"
                        >
                            Click here
                        </a>
                        .
                    </h4>

                    <div>
                        <div className="flex items-center my-8">
                            <div className="mr-6">
                                <Pagination
                                    allBanks={banks}
                                    updateTableData={updateTable}
                                    updateIndexes={updateIndexes}
                                />
                            </div>

                            <div className="mr-6">
                                <Dropdown
                                    label="City"
                                    data={cities}
                                    selected={state.city}
                                    handleSelection={handleDropdown}
                                />
                            </div>

                            <div className="mr-6">
                                <Dropdown
                                    label="Category"
                                    data={categories}
                                    selected={state.category}
                                    handleSelection={handleDropdown}
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <Loading />
                        ) : state.tableData.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <Table data={state.tableData} />
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard
