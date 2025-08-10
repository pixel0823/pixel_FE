import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@components/page/Header";
import BannerSection from "@components/page/BannerSection";
import MenuBar from "@components/page/MenuBar";
import PageContainer from "@components/page/PageContainer";
import SectionIntro from "@/pages/Sections/SectionIntro";
import SectionCommunity from "@/pages/Sections/SectionCommunity";

const BANNER_HEIGHT = 320; // 중복 피하기 위해 상단에서만 선언

const PAGE_LIST = [
    { key: "intro", label: "게임 소개" },
    { key: "community", label: "커뮤니티" },
];

const MainPage: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState("intro");
    const [bannerOpacity, setBannerOpacity] = useState(1);
    const [menuFixed, setMenuFixed] = useState(false);

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
                setSelectedPage={setSelectedPage}
                fixed={menuFixed}
                pageList={PAGE_LIST}
            />
            <PageContainer menuFixed={menuFixed}>
                <AnimatePresence mode="wait">
                    {selectedPage === "intro" && <SectionIntro key="intro" />}
                    {selectedPage === "community" && <SectionCommunity key="community" />}
                </AnimatePresence>
            </PageContainer>
        </>
    );
};

export default MainPage;
