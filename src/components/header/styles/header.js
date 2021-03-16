import styled from "styled-components/macro"
import {Link as ReactRouterLink} from "react-router-dom"

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${({src}) => (src ? `../images/misc/${src}.jpg` : '../images/misc/home-bg.jpg')}) top left / cover no-repeat; 
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 56px;
  height: 64px;
  padding: 18px 0;
  align-items: center;

  a {
    display: flex;
  }

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const Logo = styled.img`
  width: 108px;
  height: 32px;
  margin-right: 40px;

  @media (min-width: 1449px) {
    heigth: 45px;
    width: 167px;
  }
`;

export const Frame = styled.div``;

export const ButtonLink = styled(ReactRouterLink)`
  display: block;
  background-color: #e50914;
  width: 84px;
  height: fit-content;
  color: #fff;
  border: 0;
  font-size: 15px;
  border-radius: 3px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background-color: #f40612;
  }
`;
