import path from 'path'


function getFdReplace(fdOld) {
    let fd = fdOld.replace(/C:.+[0-9]{1}-[0-9]{1}-/, '') //[tag:換位置時要調整]
    let fdNew = path.resolve(fdOld, fd) //指向實際套件程式碼資料夾
    return fdNew
}


export default getFdReplace
