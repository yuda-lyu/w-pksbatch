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
        fdHook: (fdOld, fdNew) => {
            // console.log('fdOld', fdOld)
            // console.log('fdNew', fdNew)

            // //fnSrc, 覆蓋.eslintignore
            // let fnSrc = '.eslintignore'
            // let fnTar = path.resolve(fdNew, fnSrc)
            // overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


            //fnSrc, 覆蓋.eslintrc.js
            let fnSrc = '.eslintrc.js'
            let fnTar = path.resolve(fdNew, fnSrc)
            overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.babelrc
            // let fnSrc = '.babelrc'
            // let fnTar = path.resolve(fdNew, fnSrc)
            // overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋babel.config.js
            // let fnSrc = 'babel.config.js'
            // let fnTar = path.resolve(fdNew, fnSrc)
            // overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋.travis.yml
            // let fnSrc = '.travis.yml'
            // let fnTar = path.resolve(fdNew, fnSrc)
            // overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


            // //fnSrc, 覆蓋./.github/workflows/ci-test.yml
            // let fnSrc = `./.github/workflows/ci-test.yml`
            // let fnTar = path.resolve(fdNew, fnSrc)
            // overwriteFile(fnSrc, fnTar, { log: true, needExistTar: false })


        },
        cmdReplace: (v) => {
            return v
        },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runOverwriteFile
