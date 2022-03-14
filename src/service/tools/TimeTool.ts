export default class TimeTool {
    static timeout(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}