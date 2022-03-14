export default class Dialog {

    title?: string = undefined
    body?: string = undefined
    callback = function() { }

    constructor(title: string, body: string, callback: any) {
        this.title = title
        this.body = body
        this.callback = callback
    }

}