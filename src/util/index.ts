import md5 from 'md5'

export const MD5 = (text: string | Buffer | number[]) =>{
    return md5(text)
}

export const getToken = () => {
    let token = localStorage.getItem('user') || '{}'
    return JSON.parse(token)
}

export const setTree = (arr: any[], parentId: string | number) => {
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
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    }
}


export function noop() {};

export function getPropByPath(obj, path, strict) {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');
  
	let keyArr = path.split('.');
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
	  if (!tempObj && !strict) break;
	  let key = keyArr[i];
	  if (key in tempObj) {
		tempObj = tempObj[key];
	  } else {
		if (strict) {
		  throw new Error('please transfer a valid prop path to form item!');
		}
		break;
	  }
	}
	return {
	  o: tempObj,
	  k: keyArr[i],
	  v: tempObj ? tempObj[keyArr[i]] : null
	};
  };