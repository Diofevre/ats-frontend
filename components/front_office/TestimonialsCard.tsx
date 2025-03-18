"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  position: string;
  avatar?: string;
  className?: string;
}

const TestimonialCard = ({
  quote,
  name,
  position,
  avatar,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "group relative h-full rounded-2xl bg-white/70 backdrop-blur-sm p-8 transition-all duration-500",
        "before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-200/50 before:transition-all",
        "after:absolute after:inset-0 after:rounded-2xl after:shadow-[0_0_0_1px_rgba(0,0,0,0.02)] after:transition-all",
        "hover:before:border-indigo-200/50 hover:after:shadow-xl",
        "hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute -top-3 -left-3">
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
          <Quote className="w-full h-full text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </div>
      
      <blockquote className="relative pt-4">
        <p className="text-lg font-normal leading-relaxed text-gray-700 mb-8 italic">
          &quot;{quote}&quot;
        </p>
        <div className="mt-auto flex items-center gap-4">
          {avatar && (
            <div className="relative h-14 w-14 flex-none">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20 blur-sm" />
              <Image
                src={avatar}
                alt={name}
                className="relative rounded-full object-cover border-2 border-white shadow-md"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{position}</div>
          </div>
        </div>
      </blockquote>
      
      <div className="absolute -bottom-px left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default TestimonialCard;