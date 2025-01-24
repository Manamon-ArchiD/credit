export default interface Transaction {
    _id: string
    userId: string

    date: string
    amount: number
    transactionType: 'purchase' | 'gain' | 'sale'
}
