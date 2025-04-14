import Content from "@/app/_components/renderer/content";

export default function Misc(){

    return (
        <>
            <Content API={process.env.MISC_ID} />
        </>
    );
}