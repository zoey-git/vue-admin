import md5 from 'js-md5'

export const MD5 = (text) =>{
    return md5(text)
}

export const getToken = () => {
    let token = localStorage.getItem('user') || '{}'
    return JSON.parse(token)
}

export const setTree = (arr, parentId) => {
    let list = JSON.parse(JSON.stringify(arr))
    let newArr = []
    for(let i = 0; i < list.length; i++) {
        let obj = list[i]
        if (obj.parentId == parentId) {
            let item = { ...obj }
            item.children = setTree(list, obj.id)
            newArr.push(item)
        }
    }
    return newArr
}

export const full = () => {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.body.msRequestFullscreen) {
            document.documentElement.body.msRequestFullscreen();
        }
    }
}