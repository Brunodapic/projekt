import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket';
import ChatUI from './components/ChatUI';
import InpurRoomId from './components/InpurRoomId';

export interface ReceiveDataEventDto {
  roomId: string;
  data: string;
}



function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState({ text: "Hi there!", sender: "bot" });
  const [sendMessage, setSendMessage] = useState('');
  const [roomId, setRoomId] = useState('1');
  console.log(roomId)


  useEffect(() => {



    const send = (data: string) => {
      console.log("send-data-event : ", data)
      setIncomingMessage({ text: data, sender: "bot" })
      console.log("spojen")
    }

    function join() {
      console.log("spojen")
    }

    function onConnect() {
      setIsConnected(true);
      socket.emit('join-room-event', {
        roomId: '1'
      });
      console.log("spojen")
    }

    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('send-data-event', send);
    socket.on('join-room-event', join);
    socket.emit('join-room-event', {
      roomId: '1'
    });


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('send-data-event');
      socket.off('join-room-event');

    };
  }, []);

  useEffect(() => {
    console.log(sendMessage)

    socket.emit('send-data-event', {
      roomId: roomId,
      data: sendMessage
  });
  }, [sendMessage,roomId]);

  console.log(isConnected)
  return (
    <>

    <InpurRoomId  setRoomId={setRoomId}/>
    <ChatUI setSendMessage={setSendMessage} incomingMessage={incomingMessage}  />
       
    </>
  )
}

export default App
