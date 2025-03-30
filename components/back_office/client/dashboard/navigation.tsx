import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavClient } from "@/lib/constants/back_office/constants";

const Navigation = () => {
  const pathName = usePathname();
  return (
    <div>
      <nav>
        <ul className="flex items-center flex-wrap gap-4 mb-10 bg-transparent">
          {NavClient.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={cn(
                  "py-3 px-6 rounded-full text-gray-700 dark:text-gray-200 font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700   transition-colors duration-300",
                  pathName.startsWith(link.href)
                    ? "bg-blue-500 text-white border-blue-500"
                    : ""
                )}>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
