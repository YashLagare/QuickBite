import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { serverUrl } from "../App";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        const socketInstance = io(serverUrl, { withCredentials: true });
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            if (userData) {
                socketInstance.emit("identity", { userId: userData._id });
            }
        });

        return () => {
            socketInstance.disconnect();
            setSocket(null);
        };
    }, [userData?._id]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
