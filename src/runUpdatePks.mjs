import dealFolders from './dealFolders.mjs'
import getFolders from './getFolders.mjs'
import getFdReplace from './getFdReplace.mjs'


function runUpdatePks() {

    //fds
    let fds = getFolders()

    //scp
    let scp = ''
    scp = `
    ncu -u
    npm i
    npm audit fix
    `
    // scp = `
    // dir
    // `
    // scp = `
    // npm remove rollup-plugin-replace
    // npm i -D @rollup/plugin-replace

    // npm remove rollup-plugin-node-resolve
    // npm i -D @rollup/plugin-node-resolve

    // npm remove rollup-plugin-commonjs
    // npm i -D @rollup/plugin-commonjs
    // `

    //opt
    let opt = {
        log: true,
        fdReplace: getFdReplace,
        // scpReplace: (fdOld, fdNew, scp) => {
        //     return scp
        // },
        // cmdReplace: (v) => {
        //     return v
        // },
    }

    //dealFolders
    dealFolders(fds, scp, opt)

}


export default runUpdatePks

