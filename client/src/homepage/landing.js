import React,{useState,useEffect} from 'react';
import {Layout} from 'antd';
import Topmenu from '../menubar/topmenu'
import 'antd/dist/antd.css';
import './home.css'
import ShoeContainer from './ShoeContainer'

const {Header,Content,Footer} = Layout;
const ip = 'http://127.0.0.1:8000/api/'

// const GetUrl = (id) =>{

//     useEffect(async ()=>{
//         const response = await fetch(`${ip}sneakers/${toString(id)}`);
//         const data = await response.json();
//         console.log(data);
//     },[]);

//     return;

// }

const GetJson = (url) => {
    useEffect(() => {
        const response = async () => {
            const reply = await fetch(url);
            const data = await reply.json();
            console.log(data);
        }
        response();
    },[]);
}

function Landing() {

    //const shoe = GetUrl(2690);
    //const dog = GetJson('https://dog.ceo/api/breeds/image/random');

    const dog = GetJson('http://127.0.0.1:8000/api/sneakers/2690');

  return (
    <Layout style={{backgroundColor:"white"}}>
        <Header>
            <Topmenu />
        </Header>
        <Content>
            <div className="preach">
                <h1>
                    Left or Right , Bitch ?
                </h1>
            </div>
            <div className="holy-div">
                <ShoeContainer shoename="JORDAN1" filepath="./shoe1.png" />
                <ShoeContainer shoename="JORDAN1" filepath="./shoe1.png" />
            </div>
        </Content>
        <Footer>
            <p>This aint much but its honest work</p>
        </Footer>
    </Layout>
  );
}

export default Landing;
