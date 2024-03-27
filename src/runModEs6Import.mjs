import path from 'path'
import fs from 'fs'
import _ from 'lodash-es'
import w from 'wsemi'
import getFolders from './getFolders.mjs'


let coreFd = (fd) => {
    //取專案資料夾下第1層資料夾

    //vfs
    let vfs = w.fsTreeFolder(fd)

    //filter
    vfs = _.filter(vfs, { isFolder: true })
    // console.log('vfs', vfs)

    //不取「.」開頭
    vfs = _.filter(vfs, (v) => {
        let c = w.strleft(v.name, 1)
        return c !== '.'
    })

    //不取「_」開頭
    vfs = _.filter(vfs, (v) => {
        let c = w.strleft(v.name, 1)
        return c !== '_'
    })

    //不取「node_modules」
    vfs = _.filter(vfs, (v) => {
        return v.name !== 'node_modules'
    })

    //不取「dist」
    vfs = _.filter(vfs, (v) => {
        return v.name !== 'dist'
    })

    //不取「docs」
    vfs = _.filter(vfs, (v) => {
        return v.name !== 'docs'
    })

    //不取「examples」
    vfs = _.filter(vfs, (v) => {
        return v.name !== 'examples'
    })

    vfs = _.map(vfs, (v) => {
        return {
            path: v.path,
            name: v.name,
        }
    })

    return vfs
}

let coreMjs = (fd) => {
    //取專案資料夾下指定資料夾下的mjs檔

    //vfs
    let vfs = w.fsTreeFolder(fd, null)

    //filter
    vfs = _.filter(vfs, null)
    // console.log('vfs', vfs)

    //取mjs
    vfs = _.filter(vfs, (v) => {
        let c = w.strright(v.name, 4)
        return c === '.mjs' || c === '.vue' //mjs或vue檔都要處理
    })

    vfs = _.map(vfs, (v) => {
        return {
            path: v.path,
            name: v.name,
        }
    })

    return vfs
}

let dealLodashImport = (fp) => {

    let rp = false
    let c = ''

    if (true) {

        c = fs.readFileSync(fp, 'utf8')

        let lines = _.split(c, '\n')

        lines = _.map(lines, (line) => {

            //先去除頭尾空白
            let t = _.trim(line)

            //偵測import
            let bimp1 = w.strleft(t, 7) === 'import '
            let bimp2 = w.strleft(t, 9) === '//import '
            let bimp3 = w.strleft(t, 10) === '// import '
            let bimp = bimp1 || bimp2 || bimp3

            //check
            if (!bimp) {
                return line
            }

            //偵測套件
            let bsem = t.indexOf('wsemi/src/') > 0
            let blds = t.indexOf('lodash-es/') > 0
            let bcpo = t.indexOf('crypto-js/') > 0
            let bpks = bsem || blds || bcpo

            //偵測cjs lodash
            let bldsc = t.indexOf('lodash/') > 0
            if (bldsc) {
                console.log('偵測仍使用cjs lodash')
            }

            //check
            if (!bpks) {
                return line
            }

            //偵測是否待修改
            let bckmjs = bsem
            let bckjs = blds || bcpo
            let cext = ''
            if (bckmjs) {
                cext = w.strright(t, 5)
            }
            else if (bckjs) {
                cext = w.strright(t, 4)
            }
            let bneed = false
            if (bckmjs) {
                bneed = cext !== `.mjs'`
            }
            else if (bckjs) {
                bneed = cext !== `.js'`
            }

            //check
            if (!bneed) {
                return line
            }

            //須修改
            rp = true

            //去除末尾「'」
            t = w.strdelright(t, 1)

            //添加
            let line_ = line
            if (bckmjs) {
                line = `${t}.mjs'`
            }
            else if (bckjs) {
                line = `${t}.js'`
            }
            // console.log('bckmjs', bckmjs)
            // console.log('bckjs', bckjs)
            // console.log('cext', cext)
            // console.log('bneed', bneed)
            // console.log('line(ori)', line_)
            // console.log('line(mod)', line)

            return line
        })

        c = _.join(lines, '\n')
        // console.log('c', c)
        // console.log('\n\n')

    }

    if (rp) {
        console.log('replace...', fp)

        //writeFileSync
        fs.writeFileSync(fp, c, 'utf8')

    }

}

function runModEs6Import() {

    //fds
    let fds = getFolders()
    // console.log('fds', fds)

    //取得專案名
    let vfps = _.map(fds, (v) => {
        let name = w.strdelleft(v, 33) //剔除「D:\\- 006 -        開源\\開源-JS-999-」
        let r = {
            name,
            path: `${v}\\${name}`,
        }
        return r
    })
    // vfps = [vfps[1]]
    // console.log('vfps', vfps)

    //指定計畫資料夾
    vfps = [
        // {
        //     name: 'cgsmdb4',
        //     path: 'D:\\計畫-高效率土壤液化分析系統-2-安家固園(1至5期)\\cgsmdb4',
        // },
        // {
        //     name: 'rddmanager',
        //     path: 'D:\\計畫-台電高放2-最終處置計畫資料庫系統-1-主系統\\rddmanager',
        // },
        {
            name: 'rddmanager_perm',
            path: 'D:\\計畫-台電高放2-最終處置計畫資料庫系統-3-權限系統\\rddmanager_perm',
        },
    ]
    console.log('vfps', vfps)

    _.each(vfps, (vfp) => {
        // console.log('vfp.name', vfp.name)

        //coreFd
        let vfds = coreFd(vfp.path)
        // console.log('vfds', vfds)

        _.each(vfds, (vfd) => {
            // console.log('vfd.name', vfd.name)

            //coreMjs
            let vfs = coreMjs(vfd.path)
            // console.log('vfs', vfs)

            _.each(vfs, (vf) => {
                // console.log('vf.name', vf.name)

                //dealLodashImport
                dealLodashImport(vf.path)

            })

        })

    })

    console.log('finish')
}


export default runModEs6Import
