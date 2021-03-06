import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSelectCode } from "./Common";
import SelectCollege from "./SelectCollege";
import "./css/Signup.css";

const Signup = () => {
    const [idOverlapCheck, setIdOverlapCheck] = useState(1);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [student_number, setStudent_number] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPwCheck, setUserPwCheck] = useState('');
    const collegeId = useSelector((state) => state.selectFlagData.college);
    const deptId = useSelector((state) => state.selectFlagData.major);
    
    const signOk = async() =>{
        const response = await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/signup',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name:name,
                id:id,
                collegeId:collegeId,
                deptId:deptId,
                student_number:student_number,
                pass:userPw,
                userPwCheck:userPwCheck
            })
        })
        .then(async(response) =>{
            alert("회원가입이 완료되었습니다.")
        })
        .catch(e => {  // API 호출이 실패한 경우
            alert("회원가입에 실패하였습니다.")
        });
    }

    const onChangeValue = (e) => {
        if(e.target.className === "name"){
            setName(e.target.value)
        }else if(e.target.className === "id"){
            setId(e.target.value)
            setIdOverlapCheck(1)

        }else if(e.target.className === "student_number"){
            setStudent_number(e.target.value)
        }else if(e.target.className === "userPw"){
            setUserPw(e.target.value)
        }else if(e.target.className === "userPwCheck"){
            setUserPwCheck(e.target.value)
        }
    }
    const dataSubmit = () =>{
        let day = new Date();
        let y = day.getFullYear();
        let m = day.getMonth()+1;
        let d = day.getDate();
        let h = day.getHours();
        let i = day.getMinutes();
        let time = y+"-"+m+"-"+d+" "+h+":"+i;
        checkSignUp( name, id, student_number, userPw, userPwCheck);
    }

      const IdCheck = async() =>{

        await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/signup/check',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        })
        
        .then((response) => {
            if (response.status === 200) {
                response.json()
                .then((data) => {
                    if(data.flag===0){
                        alert("사용 가능한 ID입니다.");
                        setIdOverlapCheck(data.flag)
                    }else{
                        alert("사용 중인 ID입니다.")
                    }
                })
            }else{
                alert("server error")
            }
        })
        .catch(e => {  // API 호출이 실패한 경우
        });
      }
      
        // // 중복 체크 검증 후 ID 수정을 막기 위해
        // const overLabError = () =>{
        //     setIdOverlapCheck(false);
        // }
        
        const checkSignUp = (name, id, student_number, userPw, userPwCheck) =>{
            // let getCheck= RegExp(/^[a-zA-Z0-9]{4,20}$/);
            // let getemail= RegExp(/^[0-9a-zA-Z][0-9a-zA-Z\_\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,6}){1,2}$/);
            // let getName = RegExp(/^[가-힣]+$/);
            // let getNum  = RegExp(/^[0-9]*$/);
            if(!name){
                alert("이름을 입력하여주세요.");
            }
            // else if(!getName.name){
            //     alert("이름을 한글로 입력해주세요");
            // }
            else if(!id){
                alert("ID를 입력하여주세요.");
            }
            // else if(!getCheck.id){
            //     alert("한글및 특수기호는 입력하실 수 없습니다.");
            // }
            else if(!userPw || !userPwCheck){
                alert("패스워드를 입력하여주세요.");
            }
            else if(userPw != userPwCheck){
                alert("패스워드가 일치하지 않습니다.");
            }
            else if(userPw.length < 6 || userPwCheck.length < 6){
                alert("패스워드를 6자리 이상으로 입력해주세요.");
            }
            else if(!student_number){
                alert("학번을 입력하여 주세요.");
            }
            // else if(!getCheck.email){
            //     alert('Email 은 4글자 이하, 한글및 특수기호는 입력하실 수 없습니다.');
            // }
            // else if(!getemail.email){
            //     alert('이메일 형식을 확인해주세요');
            // }
            else if(idOverlapCheck===1){
                alert("ID 중복 체크를 해주세요");
            }
            else{
                signOk()
                window.history.go(-1)
            }
        }

        const dataDispatch = (college, major) =>{
        }

        const dispatch= useDispatch()
        useEffect(()=>{
            fetchSelectCode(dispatch);
        },[])
    return(
        <div className={"content"}>
            <div className={"signup_wrap"}>
                <div className={"signup_form"}>
                    <h2>Sign up</h2>
                    
                    <h4>단과대학 / 학과</h4>
                    <SelectCollege style={{ display:"block" }} dataDispatch={dataDispatch}></SelectCollege> 

                    <h4>학번</h4>
                    <input className={"student_number"} type="text" placeholder="학번" onChange={onChangeValue}></input>

                    <h4>이름</h4>
                    <input className={"name"} type="text" placeholder="이름" onChange={onChangeValue}></input>
                    
                    <h4>ID</h4>
                    <input className={"id"} type="text" placeholder="ID" onChange={onChangeValue}></input>
                    <button className={"idCheck"} onClick={IdCheck} >중복체크</button>
                    <h4>Password</h4>
                    <input className={"userPw"} type="password" placeholder="Password" onChange={onChangeValue}></input>
                    
                    <h4>Password Check</h4>
                    <input className={"userPwCheck"} type="password" placeholder="Password" onChange={onChangeValue}></input>
                    
                    <button className={"signup_signup"} type="button" onClick = {dataSubmit}>Sign up</button>
                    </div>
            </div>
        </div>
    )
}

export default Signup;