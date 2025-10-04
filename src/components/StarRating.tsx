import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
    value: number;
    onChange: (value: number) => void;
    max?: number;
    labels?: string[]; // optional labels for each star
};

export function StarRating({
    value,
    onChange,
    max = 5,
    labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"],
}: StarRatingProps) {
    const [hover, setHover] = useState<number | null>(null);

    return (
        <div className="flex flex-col items-start gap-1">
            {/* Stars */}
            <div className="flex gap-1">
                {Array.from({ length: max }, (_, i) => {
                    const ratingValue = i + 1;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onChange(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            className="focus:outline-none"
                        >
                            <Star
                                className={cn(
                                    "h-6 w-6 transition-colors",
                                    (hover ?? value) >= ratingValue
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Label text */}
            <span className="text-sm text-muted-foreground">
                {hover
                    ? labels[hover - 1]
                    : value > 0
                        ? labels[value - 1]
                        : "Select a rating"}
            </span>
        </div>
    );
}
