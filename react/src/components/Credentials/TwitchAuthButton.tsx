import { useEffect, useState, useRef, FC } from 'react'
import { Input, Form, Button } from 'react-daisyui'
import { TwitchScopesAll, TwitchScopesBot } from '../../../../types/TwitchScopes.types';

interface ITwitchAuthButtonProps {
  clientId: string;
  isBroadcaster: boolean;
}

const TwitchAuthButton: FC<ITwitchAuthButtonProps> = ({clientId, isBroadcaster = false}) => {

  const twitchScopes = isBroadcaster ? TwitchScopesAll : TwitchScopesBot;

  const getScopes = () => {
    const scopes = Object.values(twitchScopes).join(' ');
    const encodedScopes = encodeURIComponent(scopes);

  }

  getScopes();


  return <>
  </>
}

export default TwitchAuthButton;
