import { FaUserCircle } from "react-icons/fa";

type TestimonialsProps = {
    name: string,
    comment: string,
    role: string
};

export default function Testimonial({name, comment, role}: TestimonialsProps) {
    return (
        <article className="p-10 bg-background rounded-second md:col-span-4 col-span-1">
            <aside className="flex flex-row items-center gap-5 mb-3">
                <div className="text-gray-300"><FaUserCircle size={40} /></div>
                <ul className="flex flex-col text-left">
                    <li><h4 className="text-lg">{name}</h4></li>
                    <li><p className="text-xs">{role}</p></li>
                </ul>
            </aside>
            <p className="text-sm">{comment}</p>
        </article>
    )
}