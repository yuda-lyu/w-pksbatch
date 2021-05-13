import fs from 'fs'
import _ from 'lodash'


function overwriteFile(fnSrc, fnTar, opt = {}) {

    //needExistTar
    let needExistTar = _.get(opt, 'needExistTar', true)

    //check
    if (!fs.existsSync(fnSrc)) {
        console.log('overwriteFile fnSrc is not exist: ', fnSrc)
        return
    }
    if (needExistTar && !fs.existsSync(fnTar)) {
        console.log('overwriteFile fnTar is not exist: ', fnTar)
        return
    }

    //textSrc
    let textSrc = ''
    if (fs.existsSync(fnSrc)) {
        textSrc = fs.readFileSync(fnSrc, 'utf8')
    }

    //textTar
    let textTar = ''
    if (fs.existsSync(fnTar)) {
        textTar = fs.readFileSync(fnTar, 'utf8')
    }

    //modify
    if (textSrc !== textTar) {

        //write
        fs.writeFileSync(fnTar, textSrc, 'utf8')

        //console
        if (opt.log === true) {
            console.log('modify:: ' + fnTar)
        }

    }

}


export default overwriteFile
