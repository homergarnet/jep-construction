import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { ReviewDto } from "@/types/review";


interface ReviewCarouselProps {
    reviews: ReviewDto[];
    interval?: number; // in ms, default 5000
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
    reviews,
    interval = 5000,
}) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    // Auto-scroll
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
        }, interval);
        return () => clearInterval(timer);
    }, [paused, interval, reviews.length]);

    const review = reviews[index];

    // Format date nicely
    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div
            className="relative w-full max-w-xl mx-auto overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={review.Id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="p-6 shadow-md bg-card">
                        <CardContent className="flex flex-col items-center text-center space-y-3">
                            {/* Project Name */}
                            <h3 className="text-lg font-semibold">{review.ProjectName}</h3>

                            {/* ⭐ Star Rating */}
                            <div className="flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < review.Rate
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-muted"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Review Description */}
                            <p className="text-lg italic text-muted-foreground">
                                "{review.ReviewDescription}"
                            </p>

                            {/* Client Info */}
                            <div>
                                <h4 className="font-semibold">{review.ClientName}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(review.DateTimeCreated)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2"
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2"
            >
                <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
                {reviews.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full transition-all ${i === index ? "bg-primary w-4" : "bg-muted"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewCarousel;
