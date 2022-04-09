import { postsCount } from '@/constants'
import { Bank } from '@/types/bank'
import { DropdownData } from '@/types/dropdown'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { DashboardState } from '../Dashboard/Dashboard.types'
import Dropdown from '../Dropdown'

import { PaginateButton } from './Pagination.subchild'

interface Props {
    allBanks: Bank[]
    updateTableData: (banks: Bank[]) => void
    updateIndexes: (indexes: DashboardState['indexes']) => void
}

const Pagination: React.FC<Props> = ({
    allBanks,
    updateTableData,
    updateIndexes,
}) => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage, setPostsPerPage] = React.useState(postsCount[0])

    const lastBankIndex = currentPage * Number(postsPerPage.value)
    const firstBankIndex = lastBankIndex - Number(postsPerPage.value)

    const StartingIndex = firstBankIndex === 0 ? 1 : firstBankIndex
    const endingIndex =
        lastBankIndex > allBanks.length ? allBanks.length : lastBankIndex

    function prevPage() {
        if (currentPage === 1) {
            return
        }

        setCurrentPage(currentPage - 1)
    }

    function nextPage() {
        if (lastBankIndex >= allBanks.length) {
            return
        }

        setCurrentPage(currentPage + 1)
    }

    function handleDropdown(data: DropdownData) {
        setPostsPerPage(data)
    }

    React.useEffect(() => {
        setCurrentPage(1)
    }, [allBanks])

    React.useEffect(() => {
        updateTableData(allBanks.slice(firstBankIndex, lastBankIndex))
        updateIndexes({ start: firstBankIndex, end: lastBankIndex })
    }, [postsPerPage, allBanks, currentPage])

    console.log(allBanks)

    return (
        <div className="flex items-center">
            <div className="flex items-center mr-6 min-w-[240px]">
                <PaginateButton onClick={prevPage} disabled={currentPage === 1}>
                    <ChevronLeft />
                </PaginateButton>

                <span>{`${StartingIndex} / ${endingIndex} of ${allBanks.length}`}</span>

                <PaginateButton
                    onClick={nextPage}
                    disabled={lastBankIndex >= allBanks.length}
                >
                    <ChevronRight />
                </PaginateButton>
            </div>

            <div>
                <Dropdown
                    label="Rows"
                    data={postsCount}
                    selected={postsPerPage}
                    handleSelection={handleDropdown}
                />
            </div>
        </div>
    )
}

export default Pagination
