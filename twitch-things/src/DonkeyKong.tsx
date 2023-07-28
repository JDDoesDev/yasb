import { FC, useEffect, useRef, useState } from 'react';

const DonkeyKong: FC = () => {
  // const dkGif = '../src/assets/PlainMelodicDamselfly-size_restricted.gif';
  const dkVideoObject = <video autoPlay src='../src/assets/DKRAP.mp4' />
  const blankScreen = <br />
  const wsUrl = 'ws://react-stuff.docksal.site:8080/';

  const [isActive, setIsActive] = useState(false);
  const lastDk = useRef(0);

  const ws = new WebSocket(wsUrl);
  console.log(ws);
  ws.onmessage = (e) => {
    try {
      const receivedData = JSON.parse(e.data) ?? undefined;
      if ('!dk' === receivedData.text) {
        console.log((Date.now() - lastDk.current) > 30000)
        if ((Date.now() - lastDk.current) > 30000) {
          setIsActive(true);
          lastDk.current = Date.now();
        }
      }
    } catch (err) {
      console.log('data not json format');
    }
  }


  useEffect(() => {
    const resetBrowserSource = () => {
      setIsActive(false);
    }
    if (isActive) {
      setTimeout(resetBrowserSource, 3000);
    }
  }, [isActive]);


  return (
    <>
    {isActive ? dkVideoObject : blankScreen }
    </>
  )
}

export default DonkeyKong;
