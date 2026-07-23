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


            //fn, 專案資料夾下的.gitignore
            let fn = path.resolve(fdPrj, '.gitignore')
            replaceContentInFile(fn, (cont) => {

                //ts, 欲加入.gitignore的項目
                let ts = [
                    `.claude`,
                    `.opencode`,
                    `.agents`,
                    `CLAUDE.md`,
                    `AGENTS.md`,
                    `.env`,
                    `tmp`,
                ]

                //lines
                let lines = cont.split('\n')

                //miss, 逐行精確比對(去除前後空白與\r)後仍缺少的項目
                let miss = _.filter(ts, (t) => {
                    return !_.some(lines, (line) => {
                        return _.trim(line) === t
                    })
                })

                //插入至node_modules行之後,無則附加於末尾
                if (!_.isEmpty(miss)) {
                    let idx = _.findIndex(lines, (line) => {
                        return _.trim(line) === 'node_modules'
                    })
                    if (idx >= 0) {
                        lines.splice(idx + 1, 0, ...miss)
                    }
                    else {
                        lines = lines.concat(miss)
                    }
                }

                cont = lines.join('\n')

                return cont
            }, { log: true })


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
            let fn2 = path.resolve(fdPrj, 'package.json')
            replaceContentInFile(fn2, (cont) => {
                let obj = JSON.parse(cont)
                _.each([obj.dependencies, obj.devDependencies], (dep) => {
                    if (dep) {
                        if (dep['lodash-es']) {
                            dep['lodash-es'] = '^4.18.1'
                        }
                        if (dep['sharp']) {
                            dep['sharp'] = '^0.35.3'
                        }
                        if (dep['playwright']) {
                            dep['playwright'] = '^1.61.1'
                        }
                        if (dep['eslint-plugin-standard']) {
                            delete dep['eslint-plugin-standard']
                        }
                        if (dep['eslint-plugin-node']) {
                            dep['eslint-plugin-n'] = '^16.6.2'
                            delete dep['eslint-plugin-node']
                        }
                        if (dep['eslint-config-standard']) {
                            dep['eslint-config-standard'] = '^17.1.0'
                        }
                        if (dep['eslint-plugin-n']) {
                            dep['eslint-plugin-n'] = '^16.6.2'
                        }
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
