import _ from 'lodash-es'
import replaceLineInFile from './replaceLineInFile.mjs'


function replaceLineInFiles(fns, lineReplace, opt = {}) {
    _.each(fns, (fn) => {
        replaceLineInFile(fn, lineReplace, opt)
    })
}

export default replaceLineInFiles
