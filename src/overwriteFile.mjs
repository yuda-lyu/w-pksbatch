import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'


function overwriteFile(fpSrc, fpTar, opt = {}) {

    //needExistTar
    let needExistTar = _.get(opt, 'needExistTar', true)

    //check
    if (!w.fsIsFile(fpSrc)) {
        console.log('overwriteFile fpSrc is not exist: ', fpSrc)
        return
    }
    if (needExistTar && !w.fsIsFile(fpTar)) {
        console.log('overwriteFile fpTar is not exist: ', fpTar)
        return
    }

    // console.log(`w.fsIsFile(fpSrc)`, fpSrc, w.fsIsFile(fpSrc))
    // console.log(`w.fsIsFile(fpTar)`, fpTar, w.fsIsFile(fpTar))

    //textSrc
    let textSrc = ''
    if (w.fsIsFile(fpSrc)) {
        textSrc = fs.readFileSync(fpSrc, 'utf8')
    }

    //textTar
    let textTar = ''
    if (w.fsIsFile(fpTar)) {
        textTar = fs.readFileSync(fpTar, 'utf8')
    }

    //modify
    if (textSrc !== textTar) {

        //fd
        let fd = w.getPathParent(fpTar)
        if (!w.fsIsFolder(fd)) {
            // w.fsCreateFolder(fd)
            console.log('fd is not exist: ', fd) //僅提示不另外創建資料夾
            return
        }

        //write
        fs.writeFileSync(fpTar, textSrc, 'utf8')

        //console
        if (opt.log === true) {
            console.log('modify: ' + fpTar)
        }

    }

}


export default overwriteFile
