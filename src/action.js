export const getVersion = async () => {
    var e = await window.parent.Xrm.Page.context.getVersion();
    return window.parent.Xrm.Page.context.getClientUrl() + "/api/data/v" + e.slice(0, e.indexOf(".") + 2)
}


export const getTableHeader = async () => {

    let url = await getVersion()
    let request = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json"
        },
        body: JSON.stringify({})
    }

    // const response = await fetch(url+'/uds_GetTablesList', request);
    const response = await fetch(url + '/uds_GetTablesList', request);
    console.log(response, "data");
    return response.status === 204 ? response : await response.json();

}



export const getSizeOfColumn = async (data) => {
    let url = await getVersion()
    let request = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url + '/uds_GetTableSize', request);
    const responseData = await response.json()
    return responseData
}


export const getSizeOfColumnMore = async (data) => {
    let url = await getVersion()
    let request = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "OData-MaxVersion": "4.0",
            "OData-Version": "4.0",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url + '/uds_GetTableSize', request);
    const responseData = await response.json()
    return responseData
}