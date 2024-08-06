import { useEffect, useState } from "react"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import { Button } from "../Button"
import http from "../../http"

export const TransactionForm = () => {

    const [types, setTypes] = useState([])

    const [transactionType, setTransactionType] = useState('')
    useEffect(() => {
        http.get('/transactions/types')
            .then(response => {
                setTypes(response.data)
            })
        
    }, [])
    return (
        <Card>
            <Heading>
                Nova transação
            </Heading>
            <Form>
                <Select     
                    value={transactionType} 
                    onChange={evt => setTransactionType(evt.target.value)}
                >
                    <option value="" disabled hidden>
                        Selecione o tipo de transação
                    </option>
                    {types.map(t => <option key={t.value} value={t.value}>{ t.display }</option>)}
                </Select>
                <div>
                    <Label>
                        Valor
                    </Label>
                    <Input placeholder="00,00" type="number"/>
                </div>
                <Button>
                    Concluir transação
                </Button>
            </Form>
        </Card>
    )
}