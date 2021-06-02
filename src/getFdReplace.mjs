import path from 'path'


function getFdReplace(fdOld) {
    let fd = fdOld.replace(/D:.+[0-9]{1}-[0-9]{1}-/, '')
    let fdNew = path.resolve(fdOld, fd) //指向實際套件程式碼資料夾
    return fdNew
}


export default getFdReplace
