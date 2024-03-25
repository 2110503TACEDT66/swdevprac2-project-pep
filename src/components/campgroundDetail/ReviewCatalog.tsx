import ReviewCard from "./ReviewCard";
import RatingOverall from "./RatingOverall";

export default function ReviewCatalog() {
    return (
        <div className="h-screen m-[20px] bg-indigo-200">
            <RatingOverall/>
            <div className="h-[50%] px-48 flex flex-col overflow-clip overflow-y-scroll">
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
                <ReviewCard author="moc" rating={5} comment="moc"/>
            </div>
        </div>
    );
}