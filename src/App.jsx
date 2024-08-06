import styled from "styled-components"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Account } from "./components/Account"
import { TransactionForm } from "./components/TransactionForm"
import { Statement } from "./components/Statement"
import http from "./http"
import { useEffect, useState } from "react"

const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 1200px;
  margin: 24px auto;
`

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 34px;
`

function App() {

  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)

  const fetchTransactions = () => {
    return http.get('/transactions')
      .then((response) => {
        const data = response.data.map(t => {
          return {
            value: t.value,
            type: t.type,
            id: t._id,
            date: new Date(t.createdAt)
          }
        })
        setTransactions(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const fetchBalance = () => {
    return http.get('/transactions/balance')
      .then((response) => {
        setBalance(response.data.balance)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    Promise.all([fetchBalance(), fetchTransactions()])
  }, [])

  const onSubmit = (transaction) => {
    return http.post('/transactions', transaction)
      .then((response) => {
        console.log(response.data)
        fetchTransactions()
        fetchBalance()
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Main>
          <Account balance={balance}/>
          <TransactionForm onSubmit={onSubmit}/>
        </Main>
        <div>
          <Statement transactions={transactions}/>
        </div>
      </Container>
    </>
  )
}

export default App
