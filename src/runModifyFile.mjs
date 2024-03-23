import path from 'path'
import _ from 'lodash-es'
import w from 'wsemi'
import dealFolders from './dealFolders.mjs'
import getFolders from './getFolders.mjs'
import getFdReplace from './getFdReplace.mjs'
import deleteLineInFile from './deleteLineInFile.mjs'
import deleteLineInFiles from './deleteLineInFiles.mjs'
import replaceLineInFile from './replaceLineInFile.mjs'
import replaceLineInFiles from './replaceLineInFiles.mjs'


function runModifyFile() {

    //fds
    let fds = getFolders()

    //scp
    let scp = ''

    //opt
    let opt = {
        log: true,
        fdReplace: getFdReplace,
        fdHook: (fdOld, fdNew) => {


            // //fn, 專案資料夾下的script.txt
            // let fn = path.resove(fdOld, 'script.txt')
            // //deleteLineInFile(fn, '#npm update', { log: true })
            // replaceLineInFile(fn, (line) => {
            //     let find = `--experimental-modules`
            //     let repl = `--experimental-modules --es-module-specifier-resolution=node`
            //     if (line.indexOf(find) >= 0 && line.indexOf(repl) < 0) {
            //         line = line.replace(find, repl)
            //     }
            //     return line
            // }, { log: true })


            // //fns, 套件資料夾下全部rollup檔案
            // let fns = w.fsGetFilesInFolder(fdNew)
            // fns = _.filter(fns, (fn) => {
            //     return fn.indexOf('.rollup') >= 0
            // })
            // fns = _.map(fns, (fn) => {
            //     return path.resove(fdNew, fn)
            // })
            // //deleteLineInFiles(fns, `import buble from 'rollup-plugin-buble'`, { log: true })
            // //deleteLineInFiles(fns, `//buble(),`, { log: true })
            // replaceLineInFiles(fns, (line) => {
            //     let find
            //     let repl

            //     find = `//指定哪些外部模組的名稱，左邊為內部模組名稱，右邊為外部提供模組名稱`
            //     repl = `//指定內外模組的關聯性，左邊為內部使用之模組名稱，右邊為外部提供之模組名稱`
            //     if (line.indexOf(find) >= 0) {
            //         line = line.replace(find, repl)
            //     }

            //     find = `//指定哪些模組需視為外部模組`
            //     repl = `//指定哪些內部模組需引用外部模組`
            //     if (line.indexOf(find) >= 0) {
            //         line = line.replace(find, repl)
            //     }

            //     return line
            // }, { log: true })


            //fn, 專案資料夾下的package.json
            let fn = path.resove(fdNew, 'package.json')
            replaceLineInFile(fn, (line) => {
                // let find = `"test": "mocha --require @babel/register",`
                // let repl = `"test": "./node_modules/.bin/mocha --require @babel/register",` //node14之前得要用./node_modules/.bin執行
                // let find = `"test": "./node_modules/.bin/mocha --require @babel/register",`
                // let repl = `"test": "mocha --parallel --timeout 60000 --require @babel/register",` //node15之後改回來自動偵測./node_modules/.bin執行
                // let find = `"test": "./node_modules/.bin/mocha --timeout 60000 --require @babel/register",`
                // let repl = `"test": "mocha --parallel --timeout 60000 --experimental-modules --es-module-specifier-resolution=node",`
                let find = `"test": "mocha --parallel --timeout 60000 --require @babel/register",`
                let repl = `"test": "mocha --parallel --timeout 60000 --experimental-modules --es-module-specifier-resolution=node",`
                if (line.indexOf(find) >= 0) {
                    line = line.replace(find, repl)
                }
                return line
            }, { log: true })


        },
        cmdReplace: (v) => {
            return v
        },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runModifyFile
