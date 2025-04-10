import fs from 'fs'


function deleteFile(fnSrc, opt = {}) {

    //check
    if (!fs.existsSync(fnSrc)) {
        console.log('deleteFile fnSrc is not exist: ', fnSrc)
        return
    }

    //unlinkSync
    fs.unlinkSync(fnSrc)

    //console
    if (opt.log === true) {
        console.log('delete: ' + fnSrc)
    }

}


export default deleteFile
