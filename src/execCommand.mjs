import cp from 'child_process'
import iconv from 'iconv-lite'
import isutf8 from 'isutf8'
import _ from 'lodash-es'
import w from 'wsemi'


function decodeBuffer(buf) {
    if (isutf8(buf)) {
        return buf.toString('utf8')
    }
    return iconv.decode(buf, 'big5') //刪除失敗是dos訊息, 格式為big5
}


function execCommand(fd, cmd, opt = {}) {

    //pm
    let pm = w.genPm()

    //optCS
    let optCS = {
        encoding: 'buffer',
        cwd: fd,
        stdio: ['inherit', 'pipe', 'pipe'], //stdin改為inherit避免ncu等指令回改輸入界面造成卡死
    }

    //cmdReplace
    if (_.isFunction(opt.cmdReplace)) {
        cmd = opt.cmdReplace(cmd)
    }

    //trim
    cmd = _.trim(cmd)

    //check
    if (cmd === '') {
        pm.resolve('no cmd')
        return pm
    }

    //console cmd
    if (opt.log === true) {
        console.log('')
        console.log('\x1b[32m%s\x1b[0m', '>> ' + cmd)
    }

    //process
    let process
    let ss = _.split(cmd, ' ')

    //spawn
    process = cp.spawn('powershell', ss, optCS)
    process.stdout.on('data', funStdout)
    process.stderr.on('data', funStderr) //rollup幾乎都用stderr輸出, 與stdout無法分開
    process.on('error', funError)
    process.on('close', funClose)

    //bs
    let bs = Buffer.from('')

    //funStdout
    function funStdout(buf) {
        //console.log('funStdout', decodeBuffer(buf))

        //concat
        bs = Buffer.concat([bs, buf])

    }

    function funStderr(buf) {
        //console.log('funStderr', decodeBuffer(buf))

        //concat
        bs = Buffer.concat([bs, buf])

    }

    function funError(buf) {
        //console.log('error', decodeBuffer(buf))

        //concat
        bs = Buffer.concat([bs, buf])

    }

    function funClose() {
        //console.log('close')

        //msg
        let msg = decodeBuffer(bs)

        //console
        if (opt.log === true) {
            console.log(msg)
        }

        //resolve
        pm.resolve(msg)

    }

    return pm
}


export default execCommand
