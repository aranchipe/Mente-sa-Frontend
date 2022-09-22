import styled from "styled-components";

export const MenuLateralStyle = styled.form`

.menu-lateral-container {
    width: 20vw;
    height: 100vh;
    background-color: var(--purple);
    padding: 1.25rem 0 0 1.25rem;
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    font-family: 'Roboto', sans-serif;

}

.menu-lateral-container h1 {

    margin-bottom: 66px;
    font-weight: 700;
    font-size: 42px;
    line-height: 49px;
}

.menu-lateral-container span {
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;


}

nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.link {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
}

.roxo {
    color: blueviolet;
}


.logout {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 76px;
}

.logout img {
    cursor: pointer;
}

.link-div {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-left: -1.25rem;
}

.link-div:hover {
    background-color: white;
    cursor: pointer;
    border-radius: 0px 48px 48px 0px;
}

.selecionado {
    background-color: white;
    border-radius: 0px 48px 48px 0px;
}
`