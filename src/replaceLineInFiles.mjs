import _ from 'lodash-es'
import replaceLineInFile from './replaceLineInFile.mjs'


function replaceLineInFiles(fns, funReplace, opt = {}) {
    _.each(fns, (fn) => {
        replaceLineInFile(fn, funReplace, opt)
    })
}

export default replaceLineInFiles
