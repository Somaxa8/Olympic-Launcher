export default class WindowRenderer {

    static hide(window: Window) {
        // @ts-ignore
        window.ipc.send("hide-app")
    }

    static minimize(window: Window) {
        // @ts-ignore
        window.ipc.send("minimize-app")
    }

    static close(window: Window) {
        // @ts-ignore
        window.ipc.send("close-app")
    }

}