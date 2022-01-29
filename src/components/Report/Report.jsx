import './Report.css'
import ReportLoader from './ReportLoader/ReportLoader'
import Table from './Table'
import { useSelector } from 'react-redux'
import {useState,useEffect} from 'react'

function Report() {
    const state = useSelector(state => state.storeageReducer)
    const [tableSize, settableSize] = useState(0)
    useEffect(() => {
        if (state.tableSizes) {
            settableSize(state.tableSizes.length)
            if (!state.showSize) {
                settableSize(state.tableSizes.length-1)
            }else{
                settableSize(state.tableSizes.length)
            }
        }
    }, [state])

    return (
        <div className="report">
            <div className="report_head">
                <div className="report_laoder">
                    <span className={`report_loader_text ${state.showSize && 'positionRelative'}`}>{tableSize} of {state.length && state.length} are analyzed</span>
                    <ReportLoader class={`${state.showSize ? 'dnone' : null}`} current={tableSize} lenght={state.length && state.length} />
                </div>

                <div className="statistic">
                    {!state.showSize ?
                        <div style={{ position: 'absolute', right: 10, top: 15 }} className="report_button">
                            <button onClick={() => { window.location.reload() }} disabled={!state.showSize ? true : false}><div class="loader">...</div></button>
                        </div>
                        :
                        <div className="report_button">
                            <button onClick={() => { window.location.reload() }} disabled={!state.showSize ? true : false}>Rerun report</button>
                        </div>
                    }

                    {state.showSize && <div className={`${state.tableHead ? 'dnone' : null}`}>
                        <img className="arrowDvider" src="https://github.com/Simuratli/imageforstorageAnylyzer/blob/main/arrowdvider.png?raw=true" alt="" />
                    </div>}
                    {state.showSize && <div className={`report_size ${state.tableHead ? 'dnone' : null}`}>
                        <span className="report_size_total">
                            total size
                        </span>
                        <span className="report_size_number">{((state.mb) / 1000).toFixed(2)}MB</span>
                    </div>}
                </div>


            </div>

            <div className="report_bottom">
                <div class="div-table">
                    <Table sort={state.tableHead ? true : false} />
                </div>
            </div>

        </div>
    )
}

export default Report
