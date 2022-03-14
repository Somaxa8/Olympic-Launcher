export default class Notification {

    constructor(title: string, body: string) {
        this.title = title
        this.body = body
    }

    title!: string
    body!:string
}