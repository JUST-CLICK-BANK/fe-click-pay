import ClickLogo from '../component/logo';
import './CardLogin.css';
import { useState } from "react";
import Loading from "../component/Loading";
import { useNavigate } from "react-router-dom";

export default function CardLogin() {

    const navigate = useNavigate();
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 

    const submit = (e) => {
        e.preventDefault(); 

       
        if (username === "click!" && password === "클릭하세요!") {
            navigate('/card-product'); 
        } else {
            setError("아이디 또는 비밀번호가 잘못되었습니다."); 
        }
    }

    return (
        <>
            <div className='mainContatiner'>
                <ClickLogo />
                <div className='loginContainer'>
                    <form
                        style={{display:"flex", alignItems:'center', flexDirection:"column", gap:"10px"}}
                        onSubmit={(e) => submit(e)}
                    >
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>아이디</label>
                            <input
                                style={{width:"243px", height:"20px"}}
                                required
                                id="input_name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>비밀번호</label>
                            <input
                                style={{width:"243px", height:"20px"}}
                                required
                                id="input_password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                            <input
                                type="submit"
                                style={{width:"80px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", border:"1px solid gray", cursor:"pointer"}}
                                value={"로그인"}
                            />
                        </div>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

