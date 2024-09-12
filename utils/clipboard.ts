export function copyToClipboard(text: string, callback?: () => void){
    navigator.clipboard.writeText(text)
    callback && callback()
}