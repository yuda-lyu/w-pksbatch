import _ from 'lodash-es'
import deleteLineInFile from './deleteLineInFile.mjs'


function deleteLineInFiles(fns, deleteText, opt = {}) {
    _.each(fns, (fn) => {
        deleteLineInFile(fn, deleteText, opt)
    })
}

export default deleteLineInFiles
