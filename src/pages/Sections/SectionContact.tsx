import { SlideCustomProps, slideVariants } from "@/components/page/SlideVariants";
import { motion } from "framer-motion";

interface SectionContactProps extends SlideCustomProps { }

const SectionContact: React.FC<SectionContactProps> = ({ enter, exitDir }) => (
    <motion.div
        custom={{ enter, exitDir }}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", padding: "62px 30px" }}
    >
        <h2 style={{ color: "#FF1A1A" }}>고객센터</h2>
        <p style={{ color: "#fff" }}>고객센터.</p>
    </motion.div>
);

export default SectionContact;
