import styled from "styled-components";
import { motion } from "framer-motion";

const HEADER_HEIGHT = 70;
const BANNER_HEIGHT = 320;

const BannerSectionWrapper = styled(motion.div)`
  position: relative;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  width: 100%;
  height: ${BANNER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3e2059;
  z-index: 10;
  overflow: hidden;
`;

interface BannerSectionProps {
    bannerOpacity: number;
}

const BannerSection: React.FC<BannerSectionProps> = ({ bannerOpacity }) => (
    <BannerSectionWrapper
        style={{
            opacity: bannerOpacity,
            pointerEvents: bannerOpacity === 0 ? "none" : "auto",
        }}
    >
        <img src="/main_banner.png" alt="Main Visual Banner" style={{ height: "90%" }} />
    </BannerSectionWrapper>
);

export default BannerSection;
