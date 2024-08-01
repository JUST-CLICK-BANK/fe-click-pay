import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyInfo.css';
import Loading from "../component/Loading";

const SERVER = "https://payment.just-click.shop/api/v1/payment";

const MyInfo = () => {
    const [onLoading, setOnLoading] = useState(true);
    const [storeData, setStoreData] = useState();
    const [urlData, setUrlData] = useState();

    // test data
    const testData = {
        name: "물팔이",
        ceo: "김선달",
        account: "123-123-123456",
        redirectUrl: [
            "http://192.168.0.99:8080",
            "http://localhost:8080",
            "https://easy-money.xyz",
        ],
    };

    const checkValidUrl = (string) => {
        try {
            const getUrl = new URL(string);
            return getUrl.protocol == 'http:' || getUrl.protocol == 'https:';
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

    const deleteUrl = (index) => {
        const editData = [...urlData];
        editData.splice(index, 1);
        setUrlData(editData);
    };

    const UrlList = (url, index) => {
        return (
            <div style={{display:'flex', flexDirection:'row', padding:'8px', paddingBottom:'0px'}} key={index}>
                <div style={{flex:1}}>{url}</div>
                <div className='inputUrlButton' onClick={() => deleteUrl(index)}>삭제</div>
            </div>
        );
    }

    const sendUpdataData = async (e) => {
        e.preventDefault();
        setOnLoading(true);
        const request = {
            name: document.getElementById('storeName').value,
            ceo: document.getElementById('storeCeo').value,
            account: document.getElementById('storeAccount').value,
            redirectUrl: urlData
        }
        try {
            const response = await axios.post(SERVER+"", request);
            console.log(response);
            alert('정보가 업데이트 되었습니다.');
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setOnLoading(false);
    }

    const getData = async () => {
        try {
            // const response = await axios.get(SERVER+"");
            const response = testData;
            setStoreData({ name:response.name, ceo:response.ceo, account:response.account });
            setUrlData(response.redirectUrl)
        } catch (error) {
            console.log(error);
            alert('서버와 연결중 오류가 발생했습니다.');
        }
        setOnLoading(false);
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <div className='infoMainContatiner'>
            <form className='infoContainer' onSubmit={(e) => sendUpdataData(e)}>
                <div className='infoName'>
                    가맹점 이름
                </div>
                <input id='storeName' className='inputText' defaultValue={storeData?.name}/>
                <div className='infoName'>
                    가맹점 대표
                </div>
                <input id='storeCeo' className='inputText' defaultValue={storeData?.ceo}/>
                <div className='infoName'>
                    연동 계좌
                </div>
                <input id='storeAccount' className='inputText' defaultValue={storeData?.account}/>
                <div className='infoName'>
                    등록된 Redirect URL
                </div>
                <div className='urlContainer'>
                    {urlData?.map(UrlList)}
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
            {onLoading? <Loading /> : ""}
        </div>
    )
}
export default MyInfo