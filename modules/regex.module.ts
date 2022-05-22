export const isGmail = (mail:string) => {
    const mailRegExp = new RegExp('gmail','gi')
    const isGmail = mail.match(mailRegExp)
    return isGmail
}