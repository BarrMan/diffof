import qs from 'qs';
import { serverPort } from '@barrman/diffof-common';

const withQueryString = (url, queryStringObj) => `${url}${qs.stringify(queryStringObj, { addQueryPrefix: true })}`;

const apiMethods = {
  loadDocumentsDiffs: async (fromIndex, toIndex, fromSource, toSource) => {
    const params = {
      fromSource,
      toSource,
    };

    if (!Number.isNaN(parseInt(fromIndex, 10))) {
      params.fromIndex = fromIndex;
    }

    if (!Number.isNaN(parseInt(toIndex, 10))) {
      params.toIndex = toIndex;
    }

    return (await fetch(withQueryString(`http://localhost:${serverPort}/diff`, params))).json();
  },
};

export default apiMethods;
