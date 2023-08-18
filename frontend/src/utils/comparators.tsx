export const ipComparator = (a: any, b: any) => {
    a = a.split('.')
    b = b.split('.')

    for (var i = 0; i < a.length; i++) {
        if (+a[i] < +b[i]) {
            return -1
        } else if (+a[i] > +b[i]) {
            return 1
        }
    }
    return 0
}