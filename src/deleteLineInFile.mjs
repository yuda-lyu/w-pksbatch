import fs from 'fs'
import _ from 'lodash-es'


function deleteLineInFile(fn, deleteText, opt = {}) {

    //check
    if (!fs.existsSync(fn)) {
        return
    }

    //read
    let hOld = fs.readFileSync(fn, 'utf8')

    //split
    let s = _.split(hOld, '\r\n')

    //filter, 刪除文件的文字
    s = _.filter(s, (line) => {
        return line.indexOf(deleteText) < 0
    })

    //join
    let hNew = _.join(s, '\r\n')

    //modify
    if (hOld !== hNew) {

        //write
        fs.writeFileSync(fn, hNew, 'utf8')

        //console
        if (opt.log === true) {
            console.log('modify:: ' + fn)
        }

    }

}


export default deleteLineInFile
