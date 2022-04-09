import { Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { Check, ChevronDown } from 'react-feather'

import { DropdownProps } from '@/types/dropdown'

const Dropdown: React.FC<DropdownProps> = ({
    label,
    data,
    selected,
    handleSelection,
}) => {
    return (
        <div className="w-max">
            <Listbox
                value={selected}
                onChange={(data) => handleSelection(data, label)}
            >
                <div className="relative">
                    <div className="flex items-center px-3 py-1 transition duration-300 ease-in-out rounded-lg bg-neutral-900 text-neutral-50 hover:bg-neutral-800">
                        <Listbox.Button className="flex items-center">
                            <Listbox.Label className="mr-3 cursor-pointer">
                                {label}:
                            </Listbox.Label>

                            <span className="block mr-2 truncate">
                                {selected.value}
                            </span>
                            <span>
                                <ChevronDown
                                    className="w-5 h-5 text-gray-400 stroke-neutral-300"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                    </div>

                    <Listbox.Options className="absolute w-full py-1 overflow-hidden bg-white border rounded-lg shadow top-10 border-neutral-200 shadow-neutral-200">
                        {data.map((item) => (
                            <Listbox.Option
                                key={item.id}
                                value={item}
                                as={Fragment}
                            >
                                {({ active, selected }) => (
                                    <li
                                        className={`px-3 py-1  flex items-center cursor-pointer ${
                                            active
                                                ? 'bg-neutral-200 text-black'
                                                : 'bg-white text-black'
                                        }`}
                                    >
                                        <div className="w-5 h-5 mr-2">
                                            {selected && (
                                                <Check
                                                    width={20}
                                                    height={20}
                                                    className="stroke-blue-500"
                                                />
                                            )}
                                        </div>
                                        {item.value}
                                    </li>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}

export default Dropdown
