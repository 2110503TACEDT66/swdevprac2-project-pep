import Link from "next/link";

export default function TopMenuItem({title, pageRef}: {title:string, pageRef:string}) {
    return (
        <Link href={pageRef} className="text-center mx-[6px] md:mx-[8px] text-[12px] md:text-[14px] text-gray-400 hover:text-gray-600">
            {title}
        </Link>
    );
}