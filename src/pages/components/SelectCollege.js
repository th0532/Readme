import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import "./css/SelectCollege.css"

const SelectCollege = (props) => {
    const {dataDispatch} = props
    const {styles} = props
    const dispatch = useDispatch()
    const allSelectList = useSelector(state => state.selectAll)
    const collegeSelectList = useSelector(state => state.selectCollege)
    const [collegeValue, setCollegeValue] = useState();
    const [majorValue, setmajorValue] = useState();

    // select 박스 단과대학 변경
    const onChangeCollege = (e) =>{
        let college = parseInt(e.target.value);
        let stateFilter = allSelectList.codeTable.filter(f=>{
            return f.collegeId === parseInt(college);
        })
        let collegeName=stateFilter[0].collegeName;
        // 하위 select 리스트
        dispatch({
            type:"FETCH_SELECT_MENU_COLLEGE",
            data:stateFilter
        })

        // target.value 저장
        dispatch({
            type:"SELECT_MENU_DATA",
            college:parseInt(college),
            collegeName:collegeName,
            major:0,
            majorName:collegeName,
        })
        
        // 표출될 데이터 redux dispatch
        
        dataDispatch(college,0)
        
        // 하위 select (Major) value 0으로 초기화
        setCollegeValue(college);
        document.querySelector("#major").value = '0';
    }

    const onChangeMajor = (e) =>{
        let major = parseInt(e.target.value);
        setmajorValue(major);
        let stateFilter = collegeSelectList.filter(f=>{
            return f.deptId === parseInt(major);
        })
        let majorName = stateFilter[0].deptName
        // target.value 저장
         dispatch({
            type:"SELECT_MENU_DATA",
            major:parseInt(major),
            majorName:majorName
        })
        dataDispatch(collegeValue,major)
    }

    useEffect(()=>{
        // // 최초의 두번째 select option 데이터 초기값을 위해 dispatch 실행
        // let stateFilter = allSelectList.codeTable.filter(f=>{
        //     return f.collegeId === parseInt(0);
        // })
        dispatch({
            type:"FETCH_SELECT_MENU_COLLEGE",
            data:[{
                "index": 1,
                "collegeId": 0,
                "deptId": 0,
                "collegeName": "총학생회",
                "deptName": "총학생회"
              }]
        })
        dispatch({
            type:"SELECT_MENU_DATA",
            college:parseInt(0),
            collegeName:"총학생회",
            majorName:"총학생회",
            major:parseInt(0)
        })
    },[])

    return (
        <div className="selectdiv">
            <select id="college" className={"select"} onChange={onChangeCollege} value={collegeValue}>
                <option value="0">총학생회</option>
                <option value="1">경영대학</option>
                <option value="2">사회과학대학</option>
                <option value="3">인문대학</option>
                <option value="4">법과대학</option>
                <option value="5">공과대학</option>
                <option value="6">바이오나노대학</option>
                <option value="7">IT융합대학</option>
                <option value="8">한의과대학</option>
                <option value="9">예술/체육대학</option>
                <option value="10">미래산업대학</option>
            </select>

            <select id="major" className={"select"} onChange={onChangeMajor} >
                {collegeSelectList&&
                    collegeSelectList.map((list,index)=>(
                        <option key={index} value={list.deptId}>{list.deptName}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectCollege
