import _ from 'lodash-es'
import w from 'wsemi'
import execCommand from './execCommand.mjs'


function execCommands(fd, scp, opt = {}) {

    //pm
    let pm = w.genPm()

    //replace
    scp = w.replace(scp, '\r\n', '\n')
    scp = w.replace(scp, '\r', '\n')

    //cmds
    let cmds = _.split(scp, '\n')
    cmds = _.map(cmds, _.trim)
    cmds = _.filter(cmds, function(v) {
        return v !== ''
    })

    //pmSeries
    w.pmSeries(cmds, (cmd) => {
        return execCommand(fd, cmd, opt)
    })
        .then((msg) => {
            pm.resolve(msg)
        })
        .catch((err) => {
            pm.reject(err)
        })

    return pm
}


export default execCommands
