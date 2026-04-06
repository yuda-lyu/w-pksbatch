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
import replaceContentInFile from './replaceContentInFile.mjs'


function runModifyFile() {

    //fds
    let fds = getFolders()
    // console.log('fds', fds)
    // return

    //scp
    let scp = ''

    //opt
    let opt = {
        log: true,
        fdReplace: getFdReplace,
        fdHook: (fdShell, fdPrj) => {


            // //fn, 專案資料夾下的.gitignore
            // let fn = path.resolve(fdPrj, '.gitignore')
            // replaceContentInFile(fn, (cont) => {
            //     let t

            //     t = `.claude`
            //     if (cont.indexOf(t) < 0) {
            //         cont = cont.replace('node_modules', `node_modules\n${t}`)
            //     }

            //     t = `.opencode`
            //     if (cont.indexOf(t) < 0) {
            //         cont = cont.replace('node_modules', `node_modules\n${t}`)
            //     }

            //     return cont
            // }, { log: true })


            // //fn, 存放專案資料夾下的script.txt移至專案資料夾內
            // let fnSrc = path.resolve(fdShell, 'script.txt')
            // let fnTar = path.resolve(fdPrj, 'script.txt')
            // if (w.fsIsFile(fnSrc)) {
            //     try {
            //         w.fsRenameFile(fnSrc, fnTar)
            //     }
            //     catch (err) {}
            // }


            // //fns, 套件資料夾下全部rollup檔案
            // let fns = w.fsGetFilesInFolder(fdPrj)
            // fns = _.filter(fns, (fn) => {
            //     return fn.indexOf('.rollup') >= 0
            // })
            // fns = _.map(fns, (fn) => {
            //     return path.resolve(fdPrj, fn)
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
            let fn = path.resolve(fdPrj, 'package.json')
            replaceContentInFile(fn, (cont) => {
                let obj = JSON.parse(cont)
                _.each([obj.dependencies, obj.devDependencies], (dep) => {
                    if (dep) {
                        if (dep['eslint-plugin-node']) {
                            dep['eslint-plugin-n'] = '^17.24.0'
                            delete dep['eslint-plugin-node']
                        }
                        delete dep['eslint-plugin-standard']
                    }
                })
                return JSON.stringify(obj, null, 2).replace(/\n/g, '\r\n') + '\r\n'
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
