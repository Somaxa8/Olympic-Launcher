import Session from "@/models/Session";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";

export default class SessionRenderer {

    static getSession(window: Window): Session {
        //@ts-ignore
        return window.ipc.sendSync("get-session")
    }

    static deleteSession(callback: any) {
        const session = getModule(SessionModule)
        session.session.sid = null
        session.saveSession()
        //@ts-ignore
        window.ipc.send("delete-session")
        callback()
    }

    static getUsername(): string {
        //@ts-ignore
        return window.ipc.sendSync("get-username")
    }

}