import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

function TableRowComp(params) {
    const classes = useStyles();
    let {data, tag} = params;
    console.log(data, tag);
    // data-: {
    //   "vr": "da",
    //   "Value": [
    //     "20050530"
    //   ]
    // },


    // tag-: 00080012
    
    return(
      <Fragment key={tag}>
        { data && (!data.Value || (data.Value && typeof(data.Value[0]) == 'string') )&&
          <TableRow>
              <TableCell padding="checkbox" />
              <TableCell >
              {tag}
              </TableCell>
              <TableCell align="right">{data.vr}</TableCell>
              <TableCell align="right">
              {
                  (data.Value)? data.Value[0]: ''
              }
              
              </TableCell>            
          </TableRow>
        }
        {
          data && data.Value && typeof(data.Value[0]) !== 'string' && 
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell >{tag}</TableCell>
            <TableCell align="right">{data.vr}</TableCell>
            {data.Value.map((item, i) => {
              console.log(item);
              return renderChildren2( item)})}
          </TableRow>
        }
        

      </Fragment>
        
    );
}

const renderChildren2 = (childrenList) => {
  console.log('childrenList-------> ', childrenList)
  // let traversingObj = (typeof(childrenList) === 'object') ? Object.keys(childrenList) : childrenList;

  // console.log('traversingObj', traversingObj[0])
  return(<Fragment >
    {
      (typeof(childrenList) === "string")? <TableCell >{childrenList}</TableCell>:Object.keys(childrenList).map((key, i) => <TableRow key={i}> 
          {/* { childrenList[key] +"-----------" +Object.keys(childrenList) + key}   */}
            {
              typeof(childrenList[key]) === 'string' && <Fragment>
                {(key !== 'vr' && key !== 'Value' && key!== "0") && <TableCell>{key}</TableCell> }
                <TableCell >{ childrenList[key]}</TableCell>
              </Fragment>
          
            }
            {
              Array.isArray(childrenList[key]) && <Fragment>
                {(key !== 'vr' && key !== 'Value' && key!== "0") && <TableCell>{key}</TableCell> }
                {childrenList[key].map( k => renderChildren2(k) )}
              </Fragment>
          
            }
            {
              !Array.isArray(childrenList[key]) && typeof(childrenList[key]) === 'object' && <Fragment>
                {(key !== 'vr' && key !== 'Value' && key!== "0") && <TableCell>{key}</TableCell> }
                <TableRow>{renderChildren2(childrenList[key])}</TableRow>
              </Fragment>
          
            }
        </TableRow>)
      }
    </Fragment>)

}








// **************************************************** //
const renderChildren = (childrenList) => {
  console.log('childrenList-------> ', childrenList)
  let traversingObj = (typeof(childrenList) === 'object') ? Object.keys(childrenList) : childrenList;

  console.log('traversingObj', traversingObj[0])
  return(<Fragment >{
    (typeof(childrenList) === "string") ? <TableCell >{childrenList}</TableCell>: traversingObj.map((key, i) => <Fragment key={i}> 
    {/* { childrenList[key] +"-----------" +Object.keys(childrenList) + key}   */}
      {
        typeof(childrenList[key]) === 'string' && <Fragment>
          <TableCell >{childrenList[key]}</TableCell>
        </Fragment>
    
      }
      {
        typeof(childrenList[key]) === 'object' && <TableRow>
        
        {Object.keys(childrenList[key]).map(item => {
          return (<TableRow>
            {/* {item+ '----><' + typeof(item) + (item!== "0") + childrenList[key][item]} */}
            {(item !== 'vr' && item !== 'Value' && item!== "0") && <TableCell>{item}</TableCell> }
            {(childrenList[key][item])? renderChildren(childrenList[key][item]) : renderChildren(item)}
          </TableRow>)
        })
      }
      </TableRow>
    
      }
      
      </Fragment>)

}</Fragment>)


  // return(<ExpandableTableRow 
  //     key={data.vr}
  //     expandComponent={
  //         Object.keys(childrenList).map((key, i) => {

  //           return <Fragment>
  //             <TableCell padding="checkbox" />
  //             <TableCell>{key}</TableCell>
  //             {
  //               (typeof(childrenList[key]) === 'string') && 
  //               <TableCell>{childrenList[key]}</TableCell>
  //             }
  //           </Fragment>
  //         })
  //     }
  //   >
  //     renderChildren()
  //   {Object.keys(childrenList).map(key => {
  //   let data = childrenList[key];
  //   let tag = key;

  //   return(<TableRow>
  //     <TableCell padding="checkbox" />
  //     <TableCell >
  //     {tag}
  //     </TableCell>
  //     {typeof(data) === 'string' && <Fragment>
  //       <TableCell component="th" scope="row">
  //         {data}
  //       </TableCell>
  //     </Fragment>}

  //     {typeof(data) !== 'string' && Object.keys(data).map(key => {
  //     <ExpandableTableRow
  //       key={data.vr}
  //       expandComponent={<Fragment>
  //         <TableCell>hello table row 1</TableCell>
  //         <TableCell align="right">hello table row 2</TableCell>
  //         <TableCell align="right">hello table row 3</TableCell>
  //       </Fragment>}
  //     >
        

  //     </ExpandableTableRow>}
  //     )}

  //     {typeof(data) !== 'string' && renderChildren(data)}
  //     {/* <TableCell align="right">
  //     {
  //         (data.Value)? data.Value[0]: ''
  //     }
      
  //     </TableCell>             */}
  //   </TableRow>)
  // })}
  // </Fragment>);
  // // debugger;

  // return x[0].props.children;
  // return (<ExpandableTableRow
  //   key={data.vr}
  //   expandComponent={<Fragment>
  //     <TableCell>hello table row 1</TableCell>
  //     <TableCell align="right">hello table row 2</TableCell>
  //     <TableCell align="right">hello table row 3</TableCell>
  //   </Fragment>}
  // >
  //   <TableCell component="th" scope="row">
  //     {tag}
  //   </TableCell>
  //   <TableCell align="right">{data.vr}</TableCell>
  //   <TableCell>
  //     Child----            
  //   </TableCell>
      

  // </ExpandableTableRow>)
}


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
    return (
      <>
        <TableRow {...otherProps}>
          <TableCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell padding="checkbox" />
            {expandComponent}
          </TableRow>
        )}
      </>
    );
  };

export default TableRowComp;