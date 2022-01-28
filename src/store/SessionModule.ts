import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store/store";
import Session from "@/model/Session";

@Module({dynamic: true, store, name: "SessionModule"})
export default class SessionModule extends VuexModule {

    session: Session = new Session()

    get isLogin() {
        return !!this.session.sid
    }

    @Mutation
    setSession(session: Session) {
        this.session = session;
    }

    @Action
    saveSession() {
        try {
            localStorage.setItem(Session.KEY, JSON.stringify(this.session))
        } catch (e) {
            console.log("Error on saving session...")
            localStorage.removeItem(Session.KEY)
            this.setSession(new Session())
        }
    }

    @Action
    loadSession() {
        try {
            let sessionObject = localStorage.getItem(Session.KEY)
            if (sessionObject != null) {
                this.setSession(JSON.parse(sessionObject))
            } else {
                this.setSession(new Session())
            }
        } catch (e) {
            console.log("Error on loading session...")
            localStorage.removeItem(Session.KEY)
            this.setSession(new Session())
        }
    }

}