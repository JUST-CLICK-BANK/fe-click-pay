import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyInfo.css';
import Loading from "../component/Loading";
import { useLocation, useNavigate } from 'react-router-dom';

const SERVER = "https://just-click.shop/api/v1/businesses";

const MyInfo = () => {
    const navigate = useNavigate();
    const { storeId } = {...useLocation().state};
    const [onLoading, setOnLoading] = useState(true);
    const [storeData, setStoreData] = useState();
    const [urlData, setUrlData] = useState();

    const checkValidUrl = (string) => {
        try {
            const getUrl = new URL(string);
            return getUrl.protocol === 'http:' || getUrl.protocol === 'https:';
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const addUrl = () => {
        const urlElement = document.getElementsByClassName('inputUrl').item(0);
        if (!checkValidUrl(urlElement.value)) {
            alert("유효한 주소를 입력 해 주세요.");
            return;
        }
        const editData = [...urlData];
        editData.push(urlElement.value);
        setUrlData(editData);
        urlElement.value = "";
    };

    const removeUrl = (index) => {
        const editData = [...urlData];
        editData.splice(index,1);
        setUrlData(editData);
    };

    const UrlList = (url, index) => {
        return (
            <div style={{display:'flex', flexDirection:'row', padding:'8px', paddingBottom:'0px'}} key={index}>
                <div style={{flex:1}}>{url}</div>
                <div className='inputUrlButton' onClick={() => removeUrl(index)}>삭제</div>
            </div>
        );
    }

    const sendUpdataData = async (e) => {
        e.preventDefault();
        setOnLoading(true);
        try {
            await axios.delete(SERVER+"/redirect/"+storeId);

            urlData.forEach(async (url) => {
                const request = {
                    businessId: storeId,
                    redirUrl: url
                }
                const response = await axios.post(SERVER+"/redirect", request);
                console.log(response);
            });

            const request = {
                businessName: document.getElementById("storeName").value,
                businessCeo: document.getElementById("storeCeo").value,
                businessAccount: document.getElementById("storeAccount").value,
            }
            await axios.put(SERVER+"/"+storeId, request);

            alert('정보가 업데이트 되었습니다.');

        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setOnLoading(false);
    }

    const getData = async () => {
        try {
            const responseStore = await axios.get(SERVER+"/"+storeId);
            console.log(responseStore.data);
            const responseUrl = await axios.get(SERVER+"/redirect/"+storeId);
            console.log(responseUrl.data);
            // const responseStore = testData1;
            // const responseUrl = testData2;
            setStoreData(responseStore.data);
            setUrlData(responseUrl.data);
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
            navigate('/login');
        }
        setOnLoading(false);
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='infoMainContatiner'>
            <div className='infoInnerContainer'>
                <div style={{fontSize:"28px", textAlign:"center", marginBottom:"20px"}}>
                    등록 정보 수정
                </div>
                <form className='infoContainer' onSubmit={(e) => sendUpdataData(e)}>
                    <div className='infoName'>
                        가맹점 이름
                    </div>
                    <input id='storeName' className='inputText' defaultValue={storeData?.businessName}/>
                    <div className='infoName'>
                        가맹점 대표
                    </div>
                    <input id='storeCeo' className='inputText' defaultValue={storeData?.businessCeo}/>
                    <div className='infoName'>
                        연동 계좌
                    </div>
                    <input id='storeAccount' className='inputText' defaultValue={storeData?.businessAccount}/>
                    <div className='infoName'>
                        등록된 Redirect URL
                    </div>
                    <div className='urlContainer'>
                        {urlData?.length>0 ? urlData.map(UrlList) : ""}
                        <div style={{display:'flex', flexDirection:'row', padding:'8px'}}>
                            <input className='inputUrl'/>
                            <div className='inputUrlButton' onClick={addUrl}>추가</div>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <input
                            className='submitButton'
                            type="submit"
                            value={"변경내역 저장"}
                        />
                    </div>
                </form>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button 
                        onClick={() => navigate('/login')}
                        style={{width:"100px", height:"28px", marginTop:"20px", backgroundColor:"#fff", borderRadius:"3px", border:"1px solid gray", cursor:"pointer"}}
                    >
                        로그아웃
                    </button>
                </div>
            </div>
            {onLoading? <Loading /> : ""}
        </div>
    )
}
export default MyInfo