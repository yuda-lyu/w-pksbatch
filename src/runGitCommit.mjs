import path from 'path'
import fs from 'fs'
import dealFolders from './dealFolders.mjs'
import getFolders from './getFolders.mjs'
import getFdReplace from './getFdReplace.mjs'


function runGitCommit() {

    //fds
    let fds = getFolders()

    //scp
    let scp = ''

    //opt
    let opt = {
        log: true,
        fdReplace: getFdReplace,
        scpReplace: (fdOld, fdNew, scp) => {

            //fn
            let fn = path.resove(fdOld, 'script.txt')

            //check
            if (fs.existsSync(fn)) {

                //讀取原本script
                scp = fs.readFileSync(fn, 'utf8')

                //添加更新pks指令
                scp = `
                ncu -u
                npm i
                npm audit fix
                ` + scp

            }

            return scp
        },
        cmdReplace: (v) => {
            let c = ''

            //commit
            c = `git commit -m`
            if (v.indexOf(c) >= 0) {
                v = `git commit -m 'auto update: pks'`
            }

            //genVersion
            c = `#node --experimental-modules --es-module-specifier-resolution=node toolg/addVersion.mjs`
            if (v.indexOf(c) >= 0) {
                v = `node --experimental-modules --es-module-specifier-resolution=node toolg/addVersion.mjs`
            }

            //publish
            c = `#npm publish`
            if (v.indexOf(c) >= 0) {
                v = `npm publish`
            }

            return v
        },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runGitCommit
