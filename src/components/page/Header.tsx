import styled from "styled-components";

const HEADER_HEIGHT = 70;
const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background: #212121;
  color: #fff;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 배치 */
  font-size: 1.5rem;
  font-weight: bold;
`;

const LeftArea = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 12px; /* 아이콘과 텍스트 간격 */
`;

const RightArea = styled.div`
  padding-right: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Header: React.FC = () => (
    <FixedHeader>
        {/* 왼쪽 : 게임 아이콘 */}
        <LeftArea>
            <img
                src="/game_icon.png"
                alt="Game Icon"
                style={{ width: 48, height: 48 }}
            />
            <span>게임 아이콘</span>
        </LeftArea>

        {/* 오른쪽 : 로그인/로그아웃 버튼 */}
        <RightArea>
            <button style={{ background: "none", color: "#fff", border: "none", cursor: "pointer" }}>
                로그인
            </button>
            <button style={{ background: "none", color: "#fff", border: "none", cursor: "pointer" }}>
                회원가입
            </button>
        </RightArea>
    </FixedHeader>
);

export default Header;
