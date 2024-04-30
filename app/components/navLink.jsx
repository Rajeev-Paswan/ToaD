import Link from "next/link";

export default function NavLink ({href, text, onClick, styles}) {
    if (href) {
        return (
          <Link
            href={href}
            onClick={onClick}
            className={`${styles} px-12 py-5 max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out`}
          >
            {text}
          </Link>
        );
     } else {
        return (
          <button
            onClick={onClick}
            className={`${styles} px-12 py-5 max-lg:px-10 max-lg:py-4 hover:bg-[#c1121f] hover:transition ease-in-out`}
          >
            {text}
          </button>
        );
     }
}