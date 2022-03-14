import Session from "@/models/Session";
import {getModule} from "vuex-module-decorators";
import SessionModule from "@/store/SessionModule";

export default class SessionRenderer {

    static getSession(window: Window): Session {
        //@ts-ignore
        return window.ipc.sendSync("get-session")
    }

    static deleteSession(): Session {
        const session = getModule(SessionModule)
        session.session.sid = null
        //@ts-ignore
        return window.ipc.sendSync("delete-session")
    }

    static getUsername(): string {
        //@ts-ignore
        return window.ipc.sendSync("get-username")
    }

}