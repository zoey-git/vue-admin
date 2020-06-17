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
            document.exitFullscreen()
        }
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        }
    }
}


export function noop() {}

export function getPropByPath(obj: any, path: any, strict: any): any {
	let tempObj = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1')
	path = path.replace(/^\./, '')
  
	let keyArr = path.split('.')
	let i = 0;
	for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break
        let key = keyArr[i]
        if (key in tempObj) {
            tempObj = tempObj[key]
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
	}
}

class Filter {
    doFilter(el: any) {

    }
}

export class FilterChain extends Filter {
    filters: any[] = []
    constructor() {
        super()
        this.filters = []
    }
    addFilter(filter: any) {
        this.filters.push(filter)
    }
    removeFilter() {
        
    }
    doFilter(elements: any) {
        this.filters.map(filter => {
            elements = filter.doFilter(elements)
        })
        return elements
    }
}

export class FilterParams extends Filter {
    constructor() {
        super()
    }
    doFilter(elements: any) {
        let newElements: any = {}
        for (var key in elements) {
            if (!['', undefined, null].includes(elements[key])) {
                newElements[key] = elements[key]
            }
        }
        return newElements
    }
}