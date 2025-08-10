import styled from "styled-components";

const HEADER_HEIGHT = 70;
const BANNER_HEIGHT = 320;
const MENU_BAR_HEIGHT = 50;

const PageContainerWrapper = styled.div<{ menuFixed: boolean }>`
  margin-top: ${({ menuFixed }) =>
        menuFixed ? HEADER_HEIGHT : HEADER_HEIGHT
    }px;
  width: 100%;
  min-height: 100vh;
  background: #232326;
  position: relative;
`;

interface PageContainerProps {
    menuFixed: boolean;
    children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ menuFixed, children }) => (
    <PageContainerWrapper menuFixed={menuFixed}>{children}</PageContainerWrapper>
);

export default PageContainer;
