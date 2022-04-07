/**
 * Function to join two classnames.
 * --------
 * @param classnames : Array<string>
 * @returns classname : string
 */

export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}
