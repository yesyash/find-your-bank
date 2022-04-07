import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { PaginateButton } from './Pagination.subchild'

interface Props {
    totalBanks: number
    firstIndex: number
    lastIndex: number
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
}

const Pagination: React.FC<Props> = ({
    totalBanks,
    firstIndex,
    lastIndex,
    currentPage,
    setCurrentPage,
}) => {
    const StartingIndex = firstIndex === 0 ? 1 : firstIndex
    const endingIndex = lastIndex > totalBanks ? totalBanks : lastIndex

    function prevPage() {
        if (currentPage === 1) {
            return
        }

        setCurrentPage(currentPage - 1)
    }

    function nextPage() {
        if (lastIndex >= totalBanks) {
            return
        }

        setCurrentPage(currentPage + 1)
    }

    return (
        <div className="flex items-center">
            <PaginateButton onClick={prevPage} disabled={currentPage === 1}>
                <ChevronLeft />
            </PaginateButton>

            <span>{`${StartingIndex} / ${endingIndex} of ${totalBanks}`}</span>

            <PaginateButton
                onClick={nextPage}
                disabled={lastIndex >= totalBanks}
            >
                <ChevronRight />
            </PaginateButton>
        </div>
    )
}

export default Pagination
