import path from 'path'
import dealFolders from './dealFolders.mjs'
import getFolders from './getFolders.mjs'
import getFdReplace from './getFdReplace.mjs'
import deleteFile from './deleteFile.mjs'


function runDeleteFile() {

    //fds
    let fds = getFolders()

    //scp
    let scp = ''

    //opt
    let opt = {
        log: true,
        needExistTar: false,
        fdReplace: getFdReplace,
        fdHook: (fdOld, fdNew) => {


            //fnSrc, 刪除.babelrc
            let fnSrc = path.resove(fdNew, '.babelrc')
            deleteFile(fnSrc, { log: true })


        },
        cmdReplace: (v) => {
            return v
        },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runDeleteFile
