import fs from 'fs'
import _ from 'lodash-es'


function replaceLineInFile(fn, funReplace, opt = {}) {

    //check
    if (!fs.existsSync(fn)) {
        return
    }

    //read
    let hOld = fs.readFileSync(fn, 'utf8')

    //split
    let s = _.split(hOld, '\r\n')

    //找尋取代文字, 若funReplace回傳null, 代表刪除該列
    if (true) {
        let _s = []
        _.each(s, (line) => {
            if (_.isFunction(funReplace)) {
                line = funReplace(line)
            }
            if (line !== null) {
                _s.push(line)
            }
        })
        s = _s
    }

    //join
    let hNew = _.join(s, '\r\n')

    //modify
    if (hOld !== hNew) {

        //write
        fs.writeFileSync(fn, hNew, 'utf8')

        //console
        if (opt.log === true) {
            console.log('modify: ' + fn)
        }

    }

}


export default replaceLineInFile
