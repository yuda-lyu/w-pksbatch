import w from 'wsemi'
import dealFolder from './dealFolder.mjs'


function dealFolders(fds, scp, opt) {

    //pm
    let pm = w.genPm()

    //pmSeries
    w.pmSeries(fds, async (fd) => {
        return dealFolder(fd, scp, opt)
    })
        .then((msg) => {
            pm.resolve(msg)
        })
        .catch((err) => {
            pm.reject(err)
        })

    return pm
}


export default dealFolders
