interface Props {
    key: string
    value: object | Array<any>
}

export const setLocalItem = ({ key, value }: Props): 'sucess' | 'error' => {
    localStorage.setItem(key, JSON.stringify(value))

    return 'sucess'
}
