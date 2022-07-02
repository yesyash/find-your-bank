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
import { useAddBanks, useGetBanks } from '@/hooks/useBank'

import { Bank } from '@/types/bank'
import { DropdownData } from '@/types/dropdown'

import { categories, initialState } from './Dashboard.constants'
import { handleSearch } from './Dashboard.helpers'
import { useDashboardManager } from './Dashboard.hooks'
import { useCity, useUpdateCity } from '@/hooks/useCity'
import { cities } from '@/constants'

interface Props {
    pageName: string
    banks: Bank[]
    readonly showFilter?: boolean
}

const Dashboard: React.FC<Props> = ({
    pageName = 'All Banks',
    banks,
    showFilter,
}) => {
    const addBanks = useAddBanks()
    const city = useCity()
    const updateCity = useUpdateCity()

    const { state, updateTable, updateCategory, updateIndexes } =
        useDashboardManager(initialState)

    const { data, isLoading } = useGetBanks(city.value)

    // Handle dropdown selection
    function handleDropdown(data: DropdownData) {
        updateCategory(data)
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

                    <div>
                        <div className="flex items-center my-8">
                            <div className="mr-6">
                                <Pagination
                                    allBanks={banks}
                                    updateTableData={updateTable}
                                    updateIndexes={updateIndexes}
                                />
                            </div>

                            {showFilter && (
                                <>
                                    <div className="mr-6">
                                        <Dropdown
                                            label="City"
                                            data={cities}
                                            selected={city}
                                            handleSelection={updateCity}
                                        />
                                    </div>

                                    <div className="mr-6">
                                        <Dropdown
                                            label="Filter search by"
                                            data={categories}
                                            selected={state.category}
                                            handleSelection={handleDropdown}
                                        />
                                    </div>
                                </>
                            )}
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
