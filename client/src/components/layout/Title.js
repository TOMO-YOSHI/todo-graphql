import React from 'react';
import styled from 'styled-components';


const Title = () => {
    return (
        <TitleH1>
            Todo List
        </TitleH1>
    );
};

const TitleH1 = styled.h1`
    font-size: 50;
    padding: 15px;
    margin-bottom: 50px;

`

export default Title;