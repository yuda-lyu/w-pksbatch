import _ from 'lodash-es'
import w from 'wsemi'


function getFolders() {

    //pfd
    let pfd = 'D:\\- 006 -        開源\\'

    //fds
    let fds = []
    fds = w.fsGetFoldersInFolder(pfd)
    fds = _.filter(fds, (v) => {
        return v.indexOf('開源-JS-') >= 0
    })
    fds = _.filter(fds, (v) => {
        return v.indexOf('開源-JS-000') < 0 //剔除自己
    })
    // fds = _.filter(fds, (v) => {
    //     return v.indexOf('w-package-tools') < 0 //剔除w-package-tools
    // })
    // fds = _.filter(fds, (v) => {
    //     return v.indexOf('開源-JS-103-2-w-aggrid-vue') < 0
    // })
    // fds = _.filter(fds, (v) => {
    //     return v.indexOf('開源-JS-104-2-w-component-vue') < 0
    // })
    // fds = _.filter(fds, (v) => {
    //     return v.indexOf('開源-JS-105-3-w-audioplayer-vue') < 0
    // })
    // fds = [
    //     'D:\\開源-JS-002-1-wsemi',
    //     //...
    // ]

    // console.log('fds', fds)
    return fds
}


export default getFolders
