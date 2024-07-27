import { useState } from "react"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import { Button } from "../Button"

export const TransactionForm = () => {

    const [transactionType, setTransactionType] = useState('')

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