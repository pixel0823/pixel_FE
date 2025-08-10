import styled from "styled-components";

const HEADER_HEIGHT = 70;
const BANNER_HEIGHT = 320;
const MENU_BAR_HEIGHT = 50;

const MenuBarWrapper = styled.nav<{ fixed: boolean }>`
  position: ${({ fixed }) => (fixed ? "fixed" : "absolute")};
  top: ${({ fixed }) => (fixed ? `${HEADER_HEIGHT}px` : `${HEADER_HEIGHT + BANNER_HEIGHT}px`)};
  left: 0;
  width: 100vw;
  height: ${MENU_BAR_HEIGHT}px;
  background: #353535;
  display: flex;
  align-items: center;
  z-index: 110;
  padding-left: 32px;
`;

const MenuItem = styled.button<{ selected: boolean }>`
  background: none;
  color: ${({ selected }) => (selected ? "#FF1A1A" : "#fff")};
  border: none;
  margin-right: 24px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

interface MenuBarProps {
    selectedPage: string;
    setSelectedPage: (key: string) => void;
    fixed: boolean;
    pageList: { key: string; label: string }[];
}

const MenuBar: React.FC<MenuBarProps> = ({ selectedPage, setSelectedPage, fixed, pageList }) => (
    <MenuBarWrapper fixed={fixed}>
        {pageList.map(page => (
            <MenuItem
                key={page.key}
                selected={page.key === selectedPage}
                onClick={() => setSelectedPage(page.key)}
            >
                {page.label}
            </MenuItem>
        ))}
    </MenuBarWrapper>
);

export default MenuBar;
