import OBSWebSocket from "obs-websocket-js";


const obs = new OBSWebSocket();

export const ObsConnect = async () => {

  let isConnected = false;
  try {
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      "ws://192.168.1.48:4455",
      undefined,
      {
        rpcVersion: 1,
      }
    );
    isConnected = true;
  } catch (error: any) {
    console.error("Failed to connect", error.code, error.message);
  }
  if (isConnected) {
    return obs;
  }
  return isConnected;
};


export default ObsConnect;

