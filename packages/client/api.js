import qs from 'qs';

const withQueryString = (url, queryStringObj) => {
    return `${url}${qs.stringify(queryStringObj, { addQueryPrefix: true })}`
}

const apiMethods = {
    loadDocumentsDiffs: async (fromIndex, toIndex, fromSource, toSource) => {
        return (await fetch(withQueryString('/diff', {fromIndex,toIndex, fromSource, toSource}))).json()
    }
};


export default apiMethods;