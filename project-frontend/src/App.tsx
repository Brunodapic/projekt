import { useEffect, useState, useCallback } from 'react';
import './App.css';
import { socket } from './socket';
import ChatUI from './components/ChatUI';
import InputRoomId from './components/InputRoomId';

export interface ReceiveDataEventDto {
  roomId: string;
  data: string;
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState({ text: 'Hi there!', sender: 'bot' });
  const [sendMessage, setSendMessage] = useState('');
  const [roomId, setRoomId] = useState('1');
  const [prevRoomId, setPrevRoomId] = useState('0');

  const handleIncomingMessage = useCallback(
    (data: string) => {
      setIncomingMessage({ text: data, sender: 'bot' });
    },
    [setIncomingMessage]
  );

  const handleConnect = useCallback(() => {
    setIsConnected(true);
  }, [setIsConnected]);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
  }, [setIsConnected]);

  useEffect(() => {
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on(roomId, handleIncomingMessage);

    // Join the initial room
    socket.emit('join-room-event', { prevRoomId,roomId });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off(roomId, handleIncomingMessage);
      socket.off('join-room-event', handleIncomingMessage);

    };
  }, [roomId, handleConnect, handleDisconnect, handleIncomingMessage, prevRoomId]);

  useEffect(() => {
    socket.emit('send-data-event', {
      roomId: roomId,
      data: sendMessage
    });
  }, [sendMessage]);

  useEffect(() => {
    setPrevRoomId(roomId);
  }, [roomId]);


  console.log(isConnected);

  return (
    <>
      <InputRoomId setRoomId={setRoomId} />
      <ChatUI setSendMessage={setSendMessage} incomingMessage={incomingMessage} />
    </>
  );
}

export default App;
