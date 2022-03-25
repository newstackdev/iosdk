export type WSState = {
    socket: WebSocket | null,
    toggle: (token: string) => void,
    url: string
};

export default (upd: (token: string) => string) => {
    const state = {
        socket: null
    } as WSState;

    let pingInterval : ReturnType<typeof setInterval>;
    let pingCounter = 0;

    const processPong = (ev: any) => {
        if(ev.data === "pong") {
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
    }
    const toggle = async (token: string) => {
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
    }
    state.toggle = toggle;

    return state;
};