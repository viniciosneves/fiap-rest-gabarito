import { useEffect, useState } from "react"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import { Button } from "../Button"
import http from "../../http"
import PropTypes from 'prop-types';

export const TransactionForm = ({ onSubmit }) => {

    const [types, setTypes] = useState([])
    const [transactionType, setTransactionType] = useState('')
    const [transactionValue, setSetTransactionValue] = useState('')
    
    useEffect(() => {
        http.get('/transactions/types')
            .then(response => {
                setTypes(response.data)
            })
        
    }, [])

    const createTransacion = (evt) => {
        evt.preventDefault()
        onSubmit({
            value: parseFloat(transactionValue),
            type: transactionType
        })
        setTransactionType('')
        setSetTransactionValue('')
    }

    return (
        <Card>
            <Heading>
                Nova transação
            </Heading>
            <Form onSubmit={createTransacion}>
                <Select     
                    value={transactionType} 
                    onChange={evt => setTransactionType(evt.target.value)}
                    required
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
                    <Input 
                        placeholder="00,00" 
                        type="number"
                        value={transactionValue}
                        onChange={evt => setSetTransactionValue(evt.target.value)}
                        required
                    />
                </div>
                <Button>
                    Concluir transação
                </Button>
            </Form>
        </Card>
    )
}


TransactionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
