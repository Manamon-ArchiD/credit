export default interface Transaction {
    transactionId: string
    userId: string

    date: string
    amount: number
    transactionType: 'purchase' | 'gain' | 'sale'
}
