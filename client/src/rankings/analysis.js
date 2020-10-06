import React from 'react';
import {Layout} from 'antd';
import Topmenu from '../menubar/topmenu'
import 'antd/dist/antd.css';

const {Header,Content,Footer} = Layout;

function Analysis() {
  return (
    <Layout>
        <Header>
            <Topmenu />
        </Header>
        <Content>ranking page</Content>
        <Footer></Footer>
    </Layout>
  );
}

export default Analysis;