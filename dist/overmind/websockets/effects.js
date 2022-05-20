export default (upd) => {
    const state = {
        socket: null
    };
    let pingInterval;
    let pingCounter = 0;
    const processPong = (ev) => {
        if (ev.data === "pong") {
            pingCounter--;
            console.log("pong, pingCounter == ", pingCounter);
        }
    };
    const startPing = () => (pingInterval = setInterval(() => {
        state?.socket?.send("ping");
        pingCounter++;
        console.log("ping, pingCounter == ", pingCounter);
    }, 10000));
    const stopPing = () => {
        clearInterval(pingInterval);
    };
    const toggle = async (token) => {
        const url = upd(token);
        if (state.url === url)
            return;
        state.url = url;
        if (state.socket) {
            state.socket.removeEventListener('message', processPong);
            state.socket.removeEventListener('open', startPing);
            state.socket.removeEventListener('close', stopPing);
            state.socket.close();
            state.socket = null;
        }
        stopPing();
        if (token && url) {
            state.socket = new WebSocket(state.url);
            state.socket.addEventListener('open', startPing);
            // effects.ux.message.info('websockets open');
            //     startPing();
            // });
            state.socket.addEventListener('close', stopPing);
            //  (ev) => {
            //     // effects.ux.message.info('websockets close');
            //     stopPing();
            // });
            state.socket.addEventListener('message', processPong);
        }
    };
    state.toggle = toggle;
    return state;
};
//# sourceMappingURL=effects.js.map