import React, { useState } from 'react'
import { Input, Form, Button } from 'react-daisyui'
import apiConnector from '../../utils/apiConnector'

const Credentials = () => {
  const [clientId, setClientId] = useState<string>('')
  const [clientSecret, setClientSecret] = useState<string>('')

  const handleClientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value)
  }
  const handleClientSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientSecret(e.target.value)
  }

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiConnector.post('/api/credentials', {
      clientId: clientId,
      clientSecret: clientSecret
    })
  }



  return (
    <div>
      <Form className="space-y-4" onSubmit={handleCredentialSubmit}>
        <label htmlFor="client-id">Client ID</label>
        <Input id="client-id" value={clientId} onChange={handleClientIdChange} />
        <label htmlFor="client-secret">Client Secret</label>
        <Input id="client-secret" value={clientSecret} onChange={handleClientSecretChange} type='password'/>
        <Button color="primary" size="lg" className="w-full" type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Credentials
