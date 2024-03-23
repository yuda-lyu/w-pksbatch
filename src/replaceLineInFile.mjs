import fs from 'fs'
import _ from 'lodash-es'


function replaceLineInFile(fn, lineReplace, opt = {}) {

    //check
    if (!fs.existsSync(fn)) {
        return
    }

    //read
    let hOld = fs.readFileSync(fn, 'utf8')

    //split
    let s = _.split(hOld, '\r\n')

    //map, 找尋文字
    s = _.map(s, (line) => {
        if (_.isFunction(lineReplace)) {
            line = lineReplace(line)
        }
        return line
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


export default replaceLineInFile
