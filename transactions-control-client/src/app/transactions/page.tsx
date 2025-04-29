'use client'
import {Table} from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import transactionsServer from '../_api/transactions-server'
type FilterType = {
    startDate: Date
    endDate: Date
    transictionType: 'CREDIT' | 'DEBIT'
}
const Transactions = () => {

   const [transactions, setTransactions] = useState([])
   const [filter, setFilter] = useState({})
    useEffect(()=>{
        async function fetchData() {
            
        const response = await transactionsServer.get('/transactions')
        setTransactions(response.data)
        }
        fetchData()
    },[filter])
   

    return(
        <div className='w-full h-screen flex item-center pt-5 flex-col'>
            <div>
                <h1>Sistema de Transações Financeiras</h1>
            </div>
            <div>Filtros</div>
            <div className='w-full'></div>
            <Table.Root className='w-full'>
                <Table.Header>
                <Table.Row >
                    <Table.ColumnHeaderCell>
                        Data
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Tipo
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Taxa
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        Valor
                    </Table.ColumnHeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    <>
                        {transactions.map((item, index)=>(
                        <Table.Row key={index}>
                        <Table.Cell>{item.date}</Table.Cell>
                        <Table.Cell>{item.transactionType}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.value}</Table.Cell>
                        </Table.Row>
                         ))}
                    </>
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default Transactions