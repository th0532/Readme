import React, { useState, useEffect } from "react";
import "../css/NoticeDetail.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#5CACF2",
        color: "white",
    },
}));

const NoticeDetail = (props) => {
    const classes = useStyles();
    const NoticePoster = require("../../../img/Notice.png");
    const [noticeData, setNoticeData] = useState([""]);
    const [isLoading, setIsLoading] = useState(false);
    const path_id = props.match.params.id;
    const [authority, setAuthority] = useState("");

    useEffect(() => {
        setAuthority(window.sessionStorage.getItem("authority"));
    }, []);

    const deleteNotice = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/delete/${path_id}`, {
            method: "get",
        }).then((response) => {
            if (response.status === 200) {
                alert("게시글이 삭제 되었습니다.");
            } else {
                alert("오류가 발생했습니다. 관리자에게 문의하세요.");
            }
        });
        window.history.back();
    };

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/detail/${path_id}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setNoticeData(data.detail[0]);
                    setIsLoading(true);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    // 이태희 태그까지 content 출력
    useEffect(() => {
        if (isLoading) {
            document.querySelector("#content").innerHTML = text;
        } else {
            document.querySelector("#content").innerHTML = "<p>loading...</p>";
        }
    }, [isLoading]);

    let text = noticeData[0].content;

    return (
        <div>
            <img id="NoticePoster" src={NoticePoster}></img>
            <div id="NoticeContent">
                <div>제목 | {noticeData[0].title}</div>
                <div>조회수 | {noticeData[0].view + 1}</div>
                <div>작성자 | {noticeData[0].writer}</div>
                <div>작성일 | {String(noticeData[0].time).substr(0, 10)}</div>
                <br></br>
                <div>{noticeData[0].img}</div>
                <div id="content">{noticeData[0].content}</div>
                <div id="NoticeFooter">
                    {authority === "0" && (
                        <Button onClick={deleteNotice} id="Button" className={classes.button} variant="contained">
                            삭제
                        </Button>
                    )}

                    <Link to={`/editor/update/${noticeData[0].index}`}>
                        {authority === "0" && (
                            <Button id="Button" className={classes.button} variant="contained">
                                수정
                            </Button>
                        )}
                    </Link>
                    <Link to="/notice">
                        <Button id="Button" className={classes.button} variant="contained">
                            목록
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;
