export interface DropdownData {
    id: number
    value: string
    unavailable: boolean
}

export interface DropdownProps {
    label: string
    data: Array<DropdownData>
    selected: DropdownData
    handleSelection: (data: DropdownData, type: string) => void
}
