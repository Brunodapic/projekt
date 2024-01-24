import { useEffect, useState, useCallback } from 'react';
import './App.css';
import { socket } from './socket';
import ChatUI, { messageType } from './components/ChatUI';
import InputRoomId from './components/InputRoomId';
import InputName from './components/InputName';

export interface ReceiveDataEventDto {
  roomId: string;
  data: string;
}


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState<messageType>();
  const [sendMessage, setSendMessage] = useState('');
  const [roomId, setRoomId] = useState('1');
  const [username, setUsername] = useState('');


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
    socket.emit('join-room-event', { roomId });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off(roomId, handleIncomingMessage);
      socket.off('join-room-event', handleIncomingMessage);

    };
  }, [roomId, handleConnect, handleDisconnect, handleIncomingMessage]);

  useEffect(() => {
    if (sendMessage && sendMessage.trim() !== "") {
      socket.emit('send-data-event', {
        roomId: roomId,
        data: sendMessage
      });
    }

  }, [roomId, sendMessage]);

  useEffect(() => {
    if (username.trim() !== '') {
      socket.emit('send-data-event', {
        roomId: roomId,
        data: `user ${username} joined ${roomId}`
      });
    }

  }, [roomId, username]);



  console.log(isConnected);

  return (
    <>
      <InputName setUsername={setUsername} />
      <InputRoomId setRoomId={setRoomId} sendMessage={sendMessage} />
      <ChatUI setSendMessage={setSendMessage} incomingMessage={incomingMessage} roomId={roomId} />
    </>
  );
}

export default App;
