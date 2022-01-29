import React, { useState, useEffect } from 'react'
import Table from './ReportTableHead/ReportTableHead'
import Loader from '../Loader/Loader'
import { connect } from 'react-redux'
import { FETCH_ITEM_SIZES, FETCH_TABLE_HEADERS, SET_SHOW_TOTAL_SIZE, SET_SIZE_MB, GET_LENGTH, COUNT, SET_ERROR } from '../../redux/actions'
import { getTableHeader, getSizeOfColumn, getSizeOfColumnMore } from '../../action'

let columnData = []
function App(props) {
    const [loader, setLoader] = useState(true)

    const [tableHeader, settableHeader] = useState({
        data: null
    })
    const [another, setanother] = useState({
        data: [{
            system: <img className='loader_mini' src="https://gist.githubusercontent.com/maxovsanyuk/bdad46ba138ac8e6787414d08932b653/raw/3ebe3addeb4cfc2a42e51e69c8d43489057fc2d9/loader2.svg" alt="loaderMini" />,
            name: <img className='loader_mini' src="https://gist.githubusercontent.com/maxovsanyuk/bdad46ba138ac8e6787414d08932b653/raw/3ebe3addeb4cfc2a42e51e69c8d43489057fc2d9/loader2.svg" alt="loaderMini" />,
            count: <img className='loader_mini' src="https://gist.githubusercontent.com/maxovsanyuk/bdad46ba138ac8e6787414d08932b653/raw/3ebe3addeb4cfc2a42e51e69c8d43489057fc2d9/loader2.svg" alt="loaderMini" />,
            size: <img className='loader_mini' src="https://gist.githubusercontent.com/maxovsanyuk/bdad46ba138ac8e6787414d08932b653/raw/3ebe3addeb4cfc2a42e51e69c8d43489057fc2d9/loader2.svg" alt="loaderMini" />
        }]
    })
    const [metrics, setmetrics] = useState({
        data: null
    })
    let ccdata = []
    let realValuesOfEntity = []


    const columns = React.useMemo(
        () => [
            {
                Header: "data",
                columns: [
                    {
                        Header: 'System Name',
                        accessor: 'system',
                        width: 200
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                        width: 200
                    },
                    {
                        Header: 'Count',
                        accessor: 'count',
                        width: 100
                    },
                    {
                        Header: <strong style={{ color: '#1E2432' }}>Size(Kb)</strong>,
                        accessor: 'size',
                        width: 100
                    },
                ],
            },
        ],
        []
    )



    let data = metrics.data ? metrics.data : another.data
    const [len, setlen] = useState(0)

    const fetchhh = async () => {
        let headers = await getTableHeader()
        setlen(JSON.parse(headers.Tables).length)
        settableHeader((prev) => ({
            ...prev,
            data: JSON.parse(headers.Tables)
        }))
        setLoader(false)
    }

    useEffect(() => {
        fetchhh()
    }, [])

    const [sizemb, setsizemb] = useState({
        mb: 0
    })


    useEffect(() => {

        setmetrics((prev) => ({
            ...prev,
            data: columnData
        }))

    }, [sizemb, columnData])


    const fetchTableHeaders = async () => {
        let waitTime = 600
        tableHeader.data && await tableHeader.data.map(async (item, idx) => {

            setTimeout(async () => {
                setanother((prev) => ({
                    ...prev,
                    data: columnData
                }))
                let sizeColumn = await getSizeOfColumn({ Table: item })
                let parsedData = await JSON.parse(sizeColumn.Metrics)
                let MoreRecords = sizeColumn.MoreRecords
                let PagingCoockieOut = sizeColumn.PagingCoockieOut


                realValuesOfEntity.push(sizeColumn)


                ccdata.push({
                    system: parsedData.Name,
                    name: parsedData.DisplayName,
                    count: parsedData.RecordCount,
                    size: parsedData.Size
                })
                setmetrics((prev) => ({
                    ...prev,
                    data: ccdata
                }))

                var stop = true;
                setsizemb((prev) => ({
                    ...prev,
                    mb: prev.mb + Number(parsedData.Size)
                }))
                if (item === parsedData.Name) {
                    let index = columnData.findIndex((obj => obj.system === parsedData.Name));
                    columnData[index].name = parsedData.DisplayName
                    columnData[index].count = parsedData.RecordCount
                    columnData[index].size = parsedData.Size
                    setmetrics((prev) => ({
                        ...prev,
                        data: columnData
                    }))
                    if (index + 1 === Object.keys(columnData).length) {
                        props.onAddLoading(false)
                    }
                }
                let id = 2
                if (MoreRecords) {
                   
                    while (stop) {
                        let reqObject = {
                            Table: parsedData.Name,
                            Page: id++,
                            PagingCoockieIn: PagingCoockieOut
                        }
                        let moreRecordForEntity = await getSizeOfColumnMore(reqObject)
                        let parsedMoreData = await JSON.parse(moreRecordForEntity.Metrics)
                        setmetrics((prev) => ({
                            data: columnData
                        }))

                        if (parsedMoreData.Name === parsedData.Name) {
                            let index = columnData.findIndex((obj => obj.system === parsedMoreData.Name));
                            let i = realValuesOfEntity.findIndex((obj => JSON.parse(obj.Metrics).Name === parsedMoreData.Name));

                            setsizemb((prev) => ({
                                ...prev,
                                mb: prev.mb + Number(parsedMoreData.Size)
                            }))
                            columnData[index].count  = columnData[index].count  + parsedMoreData.RecordCount
                            // ccdata[idx].count = columnData[idx].count + parsedMoreData.RecordCount
                            // ccdata[idx].size = columnData[idx].size + parsedMoreData.Size
                            columnData[index].size =  columnData[index].size + parsedMoreData.Size
                            realValuesOfEntity[i].MoreRecords = moreRecordForEntity.MoreRecords

                            setmetrics((prev) => ({
                                data: columnData
                            }))
                        }


                        if (!moreRecordForEntity.MoreRecords) {
                            stop = false

                        }

                    }
                }

                props.onGetLength(len)

                if (realValuesOfEntity.length === len) {
                    if (realValuesOfEntity.some(e => e.MoreRecords !== true)) {
                        props.onSetShowButton(true)
                    }
                    setmetrics((prev) => ({
                        ...prev,
                        data: ccdata
                    }))
                    setmetrics((prev) => ({
                        data: columnData
                    }))

                }


            }, waitTime * Number(idx));
        })
        props.onAddSize(ccdata)
    }

    useEffect(() => {
        props.onSetSizeMb(sizemb.mb)
    }, [sizemb])

    useEffect(() => {

        tableHeader.data && tableHeader.data.map(item => {
            columnData.push({
                system: item,
                name: <div className='loaderLine' ><div className={`line ${item}`}><div className="checked-line" /></div></div>,
                count: 0,
                size: 0
            })

        })

        fetchTableHeaders()

    }, [tableHeader])


    return (
        <>
            {loader ? <Loader /> : <Table sort={props.sort} ccData={metrics} data={data} length={tableHeader.data ? tableHeader.data.length : 10000} columns={columns} />}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onAddSize: (img) => { dispatch({ type: FETCH_ITEM_SIZES, tableSizes: img }) },
        onAddLoading: (load) => { dispatch({ type: FETCH_TABLE_HEADERS, tableHead: load }) },
        onGetLength: (length) => { dispatch({ type: GET_LENGTH, length: length }) },
        onGetCount: (count) => { dispatch({ type: COUNT, count: count }) },
        onSetError: (error) => { dispatch({ type: SET_ERROR, error: error }) },
        onSetSizeMb: (mb) => { dispatch({ type: SET_SIZE_MB, mb: mb }) },
        onSetShowButton: (showSize) => { dispatch({ type: SET_SHOW_TOTAL_SIZE, showSize: showSize }) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)