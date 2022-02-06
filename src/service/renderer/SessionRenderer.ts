import Session from "@/models/Session";

export default class SessionRenderer {

    static getSession(window: Window): Session {
        //@ts-ignore
        return window.ipc.sendSync("get-session")
    }

}