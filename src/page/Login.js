import axios from "axios";
import ClickLogo from '../component/logo';
import './Login.css';
import { useState } from "react";
import Loading from "../component/Loading";
import { useNavigate } from "react-router-dom";

const SERVER = "https://just-click.shop/api/v1/businesses";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                SERVER+"/signin",
                {
                    businessKey: document.getElementById("input_name").value,
                    businessPassword: document.getElementById("input_password").value,
                }
            );
            console.log(response.data)
            alert("성공!");
            // navigate('/info', {state: {storeId: response.data.businessId}});
        } catch (error) {
            // console.log(error);
            alert('로그인에 실패했습니다.\n키와 비밀번호를 확인해주세요.');
        }
        document.getElementById("input_password").value = "";
        setLoading(false);
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
                            <label style={{width:"100px"}}>API 키</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_name"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <label style={{width:"100px"}}>비밀번호</label>
                            <input style={{width:"243px", height:"20px"}} required id="input_password" type="password"/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                            <input
                                type="submit"
                                style={{width:"80px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", cursor:"pointer"}}
                                value={"로그인"}
                            />
                            <input
                                type="button"
                                onClick={() => {navigate('/new')}}
                                style={{width:"80px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", cursor:"pointer"}}
                                value={"신규 등록"}
                            />
                        </div>
                    </form>
                </div>
            </div>
            {isLoading? <Loading /> : ""}
        </>
    )
}
export default Login