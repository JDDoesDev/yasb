import { useState, FC } from 'react'
import { Input, Button } from 'react-daisyui'
import copyToClipboard from '../../utils/copyToClipboard';

interface ITwitchAuthLinkProps {
  authUrl: string;
}

const TwitchAuthLink: FC<ITwitchAuthLinkProps> = ({ authUrl }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    copyToClipboard(authUrl).then(() => {
      setIsCopied(true);
    });
  }

  return <div>
    <p>Copy this URL and paste it in an incognito/private browser then log in with your bot user</p>
    <label htmlFor="auth-link">URL:</label>
    <Input id="auth-link" value={authUrl ?? ''} readOnly/>
    <Button color="primary" size="lg" className="w-full" onClick={handleCopy}>
      { isCopied ? `Copied` : `Copy`}
    </Button>
  </div>

}

export default TwitchAuthLink;
