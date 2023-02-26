export function createWebSocketClient() {
    const socket = new WebSocket("ws://localhost:3001")

    socket.addEventListener("open", (event) => {
        console.log('WebSocket connected.')
    })

    socket.addEventListener("message", (event) => {
        console.log("WebSocket message received:", event.data)
    })

    return socket;
}