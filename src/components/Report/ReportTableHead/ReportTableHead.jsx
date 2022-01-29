import { useTable, useFilters , usePagination,useSortBy   } from 'react-table'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
function Table({ columns, data, length,sort }) {
 

  const Select = styled.div`
  display: flex;
  width: 50px;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(161, 173, 206, 0.12);
  box-shadow: 0 0 29.6px 0 rgba(161, 173, 206, 0.12);
  position: absolute;
  top: 0;
  right: -50px;

  .row {
    display: flex;
    justify-content: center;
    padding: 5px;
    border-bottom: #f9faff;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      cursor: pointer;
      background: #E8EBFE;
    }
  }

  
`;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter ,
    rows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: {
        pageIndex: 0, 
        sortBy: [
            {
                id: 'size',
                desc: true
            }
        ]
    }
    },
    useFilters ,
    useSortBy,
    usePagination,
   
  )

 
const [filterInput, setFilterInput] = useState("");

function searchInput(e){
    
    const value = e.target.value || undefined;
    setFilter("system", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
}



const [pageForRow, setpageForRow] = useState(10)
const [selectItemsOpen, setSelectItemsOpen] = useState(false);

  return (
    <>
     
        <div className="report_bottom_head">
                    <div className="report_bottom_head_search">
                        <img src="https://gist.githubusercontent.com/maxovsanyuk/659a136513ab5267d4a97bc930db9722/raw/441c7dbfc05b4a41b2d366b2d2d836ca7b2872d6/search.svg" alt="Search" />
                        <input  value={filterInput} onChange={searchInput} type="text" placeholder="Search" />
                    </div>
                    <div className="pagination report_bottom_head_filter">
            <span>
                    <span><span>Rows per page</span> <span  className="pagination-numbers">1-{pageForRow} 
                    <img
                            className="select-handler"
                            src="https://gist.githubusercontent.com/maxovsanyuk/6312cd39c95da85b5f3077320fae6aa3/raw/bcf98618837a15c11a6b5508bf141eea34aa4527/arrow.svg"
                            alt="arrow"
                            style={{
                                transform: selectItemsOpen && "rotateX(180deg)",
                            }}
                            onClick={() => {
                                setSelectItemsOpen(!selectItemsOpen);
                            }}
                        />
                    </span>
                   
                    {/* <select style={{fontSize:16}} value={pageSize} onChange={e => {
                        if(e.target.value==='All'){
                            setPageSize(length)
                        }else{
                            setPageSize(Number(e.target.value))
                        }
                    }}>
                      <option value={length ? length : 1000}>All</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select> */}
                    <Select className={`${!selectItemsOpen && 'dnone'}`} style={{position: 'absolute',top: 34,left: 120,zIndex:20}}>
                      {["All" , 5, 10, 15, 20].map((r) => {
                          return (
                              <div
                                  onClick={() => {
                                    if(r ==='All'){
                                      setPageSize(length)
                                      setpageForRow(length)
                                    }else{
                                        setPageSize(Number(r))
                                        setpageForRow(r)
                                    }
                                    setSelectItemsOpen(false)
                                  }}
                                  className="row"
                                  key={r}
                              >
                                  {r}
                              </div>
                          );
                      })}
                  </Select>
                </span>
                <span>
                    <span>
                    {/* {pageIndex + 1} */}
                      of  {pageCount}
                    </span>
                </span>
                </span>
                <div className="report_bottom_head_buttons">
                    <button onClick={previousPage} disabled={!canPreviousPage}>
                        <img onClick={() => {previousPage();setSelectItemsOpen(false)}} className='report_bottom_head_buttons_left' src="https://gist.githubusercontent.com/maxovsanyuk/50ed40cc2c5e901ea51b13a57342e2e0/raw/9e1e371d13ebb13d490294a9a217d0dcddaa09a8/arrowActive.svg" alt="" />
                    </button>
                    <button onClick={nextPage}>
                        <img onClick={() => {nextPage() ; setSelectItemsOpen(false)}} disabled={!canNextPage} src="https://gist.githubusercontent.com/maxovsanyuk/50ed40cc2c5e901ea51b13a57342e2e0/raw/9e1e371d13ebb13d490294a9a217d0dcddaa09a8/arrowActive.svg" alt="" />
                    </button>
            </div>
      </div>
                </div>
              
      <table id="customers" {...getTableProps()}>
      <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  {!sort &&  <span>
                    {!sort
                      ? column.isSortedDesc
                        ? <img alt="" style={{ marginLeft:"5px"}} src="https://gist.githubusercontent.com/maxovsanyuk/7b36ba7547dcf8e95b31b1fcaa87b855/raw/3e553f367f8ae25705c7848ce8bf1d0ed4042820/filtration.svg" />
                        : <img alt="" style={{transform: "rotate(180deg)" , marginLeft:"5px"}} src="https://gist.githubusercontent.com/maxovsanyuk/7b36ba7547dcf8e95b31b1fcaa87b855/raw/3e553f367f8ae25705c7848ce8bf1d0ed4042820/filtration.svg" />
                      : null}
                  </span>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}





export default Table