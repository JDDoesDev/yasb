import { FC, useState } from 'react'
import { Input, Form, Button, Select } from 'react-daisyui'
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {

  const [userType, setUserType] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUserType(value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const provId = encodeURIComponent(`twitch-role:${userType}`);
    const urlParams = `?username=${username}&provId=${provId}`;
    navigate(`/api/v1/twitch/auth${urlParams}`, { replace: false })
  }

  return (
    <Form>
      <label htmlFor='username'>Username</label>
      <Input id='username' required value={username} onChange={handleNameChange}/>
      <label htmlFor='select-role'>Role</label>
      <Select id='select-role' onChange={handleSelectChange}>
        <option>Select a role</option>
        <option value='streamer'>Streamer</option>
        <option value='bot'>Bot</option>
      </Select>
      <Button id='login-submit' color='primary' size='lg' className='w-full' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>

  )
}

export default Login
