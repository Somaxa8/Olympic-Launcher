import {resolve} from "path";

export default class InjectorTool {

    // @ts-ignore
    static readonly LOGIN_INJECTOR: string = `file:${resolve(__static, './injectors/loginInjector.js')}`
    // @ts-ignore
    static readonly STORE_INJECTOR: string = `file:${resolve(__static, './injectors/storeInjector.js')}`

}