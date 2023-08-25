import React, { useEffect, useState, FC } from 'react'
import { Input, Form, Button } from 'react-daisyui'
import { TwitchScopes } from '../../../../types/TwitchScopes';

interface ITwitchAuthButtonProps {
  clientId: string;
}

const TwitchAuthButton: FC<ITwitchAuthButtonProps> = ({clientId: string}) => {

  const getScopes = () => {
    const scopes = Object.values(TwitchScopes).join(' ');
    const encodedScopes = encodeURIComponent(scopes);
    console.log(scopes)
    console.log(encodedScopes);
  }

  getScopes();


  return <>
  </>
}

export default TwitchAuthButton;
