import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@components/page/Header";
import BannerSection from "@components/page/BannerSection";
import MenuBar from "@components/page/MenuBar";
import PageContainer from "@components/page/PageContainer";
import SectionIntro from "@/pages/Sections/SectionIntro";
import SectionNotice from "@/pages/Sections/SectionNotice";
import SectionUpdate from "@/pages/Sections/SectionUpdate";
import SectionContact from "@/pages/Sections/SectionContact";
import SectionCommunity from "@/pages/Sections/SectionCommunity";

const BANNER_HEIGHT = 320; // 중복 피하기 위해 상단에서만 선언

const PAGE_LIST = [
    { key: "intro", label: "게임 소개" },
    { key: "notice", label: "공지사항" },
    { key: "update", label: "업데이트" },
    { key: "community", label: "커뮤니티" },
    { key: "contact", label: "고객센터" },
];

const MainPage: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState("intro");
    const [bannerOpacity, setBannerOpacity] = useState(1);
    const [menuFixed, setMenuFixed] = useState(false);

    const [enterDirection, setEnterDirection] = useState<"left" | "right">("right");
    const [exitDirection, setExitDirection] = useState<"left" | "right">("left");

    const handleMenuClick = (targetKey: string) => {
        const currentIdx = PAGE_LIST.findIndex(p => p.key === selectedPage);
        const targetIdx = PAGE_LIST.findIndex(p => p.key === targetKey);

        if (targetIdx > currentIdx) {
            setEnterDirection("right");
            setExitDirection("right");
        } else {
            setEnterDirection("left");
            setExitDirection("left");
        }
        setSelectedPage(targetKey);
    };



    useEffect(() => {
        function onScroll() {
            const scrollY = window.scrollY;
            let fadeAmount = 1 - scrollY / BANNER_HEIGHT;
            setBannerOpacity(fadeAmount > 0 ? fadeAmount : 0);
            setMenuFixed(scrollY >= BANNER_HEIGHT);
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Header />
            <BannerSection bannerOpacity={bannerOpacity} />
            <MenuBar
                selectedPage={selectedPage}
                setSelectedPage={handleMenuClick}
                fixed={menuFixed}
                pageList={PAGE_LIST}
            />
            <PageContainer menuFixed={menuFixed}>
                <AnimatePresence mode="wait" custom={{ enter: enterDirection, exitDir: exitDirection }}>
                    {selectedPage === "intro" && <SectionIntro key="intro" enter={enterDirection} exitDir={exitDirection} />}
                    {selectedPage === "notice" && <SectionNotice key="notice" enter={enterDirection} exitDir={exitDirection} />}
                    {selectedPage === "update" && <SectionUpdate key="update" enter={enterDirection} exitDir={exitDirection} />}
                    {selectedPage === "community" && <SectionCommunity key="community" enter={enterDirection} exitDir={exitDirection} />}
                    {selectedPage === "contact" && <SectionContact key="contact" enter={enterDirection} exitDir={exitDirection} />}
                </AnimatePresence>
            </PageContainer>
        </>
    );
};

export default MainPage;
