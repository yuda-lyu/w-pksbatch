import _ from 'lodash'
import execCommands from './execCommands.mjs'


async function dealFolder(fd, scp, opt) {

    //fd
    let fdOld = fd
    if (_.isFunction(opt.fdReplace)) {
        fd = opt.fdReplace(fd)
    }
    let fdNew = fd

    //console
    if (opt.log === true) {
        console.log('')
        console.log('\x1b[32m%s\x1b[0m', fdNew)
    }

    //fdHook
    if (_.isFunction(opt.fdHook)) {
        scp = opt.fdHook(fdOld, fdNew)
    }

    //scpReplace
    if (_.isFunction(opt.scpReplace)) {
        scp = opt.scpReplace(fdOld, fdNew, scp)
    }

    //execCommands
    await execCommands(fdNew, scp, opt)

}


export default dealFolder
