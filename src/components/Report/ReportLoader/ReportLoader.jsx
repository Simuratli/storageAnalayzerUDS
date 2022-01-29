import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import './ReportLoader.css'

function ReportLoader(props) {

    const [load, setLoad] = useState(0)
    const [length, setlength] = useState(0)
    const state = useSelector(state => state.storeageReducer)
    const [current, setcurrent] = useState(props.current)
    
    useEffect(() => {
        setlength(props.lenght)
        setcurrent(props.current)
        
        setLoad(Number(length)/16)
    }, [props])

    

    return (
        <div  className={`${props.class === 'dnone' ? 'dnone' : 'report_loader' }`}>
            <span className={`${current > 1*load ? 'active' : null}`}></span>
            <span className={`${current > 2* load ? 'active' : null}`}></span>
            <span className={`${current > 3* load ? 'active' : null}`}></span>
            <span className={`${current > 4* load ? 'active' : null}`}></span>
            <span className={`${current > 5*load ? 'active' : null}`}></span>
            <span className={`${current > 6*load ? 'active' : null}`}></span>
            <span className={`${current > 7*load ? 'active' : null}`}></span>
            <span className={`${current > 8* load ? 'active' : null}`}></span>
            <span className={`${current > 9* load ? 'active' : null}`}></span>
            <span className={`${current > 10* load ? 'active' : null}`}></span>
            <span className={`${current > 11* load ? 'active' : null}`}></span>
            <span className={`${current > 12* load ? 'active' : null}`}></span>
            <span className={`${current > 13* load ? 'active' : null}`}></span>
            <span className={`${current > 14* load ? 'active' : null}`}></span>
            <span className={`${current > 15* load ? 'active' : null}`}></span>
            <span className={`${current === 16* load ? 'active' : null}`}></span>
        </div>
    )
}

export default ReportLoader
