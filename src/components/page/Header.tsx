import styled from "styled-components";

const HEADER_HEIGHT = 70;
const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${HEADER_HEIGHT}px;
  background: #212121;
  color: #fff;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 32px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Header: React.FC = () => (
    <FixedHeader>
        <img src="/game_icon.png" alt="Game Icon" style={{ marginRight: 20, width: 48 }} />
        게임 아이콘 &nbsp;|&nbsp; 메인 네비 &nbsp;|&nbsp; 로그인
    </FixedHeader>
);

export default Header;
