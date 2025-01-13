import { io } from "socket.io-client";


export type User = { 
    playerId: string;
    playerName: string;
}

const currencyData = { code: "USD", name: "$US" };

export const normalUser: User = { playerId: "1", playerName: "NormalUser" };

export const initUserSession = (user: User) => {
    return {
        session: `${user.playerId}-session-id`,
        ss: `${user.playerId}-session-id`,
        currency: currencyData.name,
        username: `${user.playerId}_${user.playerName}`,
        browserUserAgent: "browser-user-agent",
    };
};


const socket = io("ws://localhost:5000/user/marblefootball", {
    transports: ["websocket"],
    upgrade: false,
    forceNew: true,
});

socket.on("connect", () => {
    console.log("connected");
    console.log(socket.id);
});

socket.on("disconnect", () => {
    console.log("disconnected");
})

socket.onAny((ev, ...args) => {
    console.log(JSON.stringify(ev))
    console.log(JSON.stringify(args))
})

socket.connect();

const session = initUserSession(normalUser);

socket.emit("signin", session);