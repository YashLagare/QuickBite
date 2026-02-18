import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        const socketInstance = io(
            import.meta.env.VITE_SERVER_URL || window.location.origin,
            { withCredentials: true }
        );
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
