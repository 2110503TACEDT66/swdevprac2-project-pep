import Link from "next/link";

export default function TopMenuItem({title, pageRef}: {title:string, pageRef:string}) {
    return (
        <Link href={pageRef} className="text-center mx-[8px] text-[12px] text-gray-200 hover:text-amber-100">
            {title}
        </Link>
    );
}