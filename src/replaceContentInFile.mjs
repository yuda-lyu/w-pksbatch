import fs from 'fs'
import _ from 'lodash-es'


function replaceContentInFile(fn, funReplace, opt = {}) {

    //check
    if (!fs.existsSync(fn)) {
        return
    }

    //read
    let hOld = fs.readFileSync(fn, 'utf8')

    //funReplace
    let hNew = hOld
    if (_.isFunction(funReplace)) {
        hNew = funReplace(hOld)
    }

    //modify
    if (hOld !== hNew) {
        // console.log('hOld', hOld)
        // console.log('hNew', hNew)

        //write
        fs.writeFileSync(fn, hNew, 'utf8')

        //console
        if (opt.log === true) {
            console.log('modify: ' + fn)
        }

    }

}


export default replaceContentInFile
