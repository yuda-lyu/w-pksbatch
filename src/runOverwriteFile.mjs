import path from 'path'
import dealFolders from './dealFolders.mjs'
import getFolders from './getFolders.mjs'
import getFdReplace from './getFdReplace.mjs'
import overwriteFile from './overwriteFile.mjs'


function runOverwriteFile() {

    //fds
    let fds = getFolders()

    //scp
    let scp = ''

    //opt
    let opt = {
        log: true,
        needExistTar: false,
        fdReplace: getFdReplace,
        fdHook: (fdShell, fdPrj) => {
            // console.log('fdShell', fdShell)
            console.log('fdPrj', fdPrj)


            // //fnSrc, 覆蓋.eslintignore
            // let fnSrc = '.eslintignore'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.eslintrc.js
            // let fnSrc = '.eslintrc.js'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.babelrc
            // let fnSrc = '.babelrc'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋babel.config.js
            // let fnSrc = 'babel.config.js'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.travis.yml
            // let fnSrc = '.travis.yml'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            //fnSrc, 覆蓋./.github/workflows/ci-test.yml
            let fnSrc = `ci-test.yml`
            let fpTar = path.resolve(fdPrj, `./.github/workflows/${fnSrc}`)
            overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋SECURITY.md
            // let fnSrc = 'SECURITY.md'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋LICENSE
            // let fnSrc = 'LICENSE'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.jsdoc
            // let fnSrc = '.jsdoc'
            // let fpTar = path.resolve(fdPrj, fnSrc)
            // overwriteFile(fnSrc, fpTar, { log: true, needExistTar: false })


        },
        cmdReplace: (v) => {
            return v
        },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runOverwriteFile
