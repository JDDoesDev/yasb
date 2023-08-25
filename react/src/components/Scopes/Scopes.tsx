import { TwitchScopes } from '../../../../types/TwitchScopes';
import { Input, Form, Checkbox } from 'react-daisyui';

export const Scopes = () => {
  return (
    <div className="scopes">
      <h2>Scopes</h2>
      <div className="scopes__list">
        <Form>
        {Object.values(TwitchScopes).map((scope) => (
          <div key={scope} className="scopes__list__item">
            <Checkbox type="checkbox" id={scope} name={scope} value={scope} />
            <label htmlFor={scope}>{scope}</label>
          </div>
        ))}
        </Form>
      </div>
    </div>
  );
}
