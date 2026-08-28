import { Star, MessageSquareQuote } from "lucide-react";
import { reviews } from "@/data/vehicles";
import { business } from "@/data/business";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Google Reviews</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-tight font-extrabold tracking-tight">
            What Our Customers Say
          </h2>
        </Reveal>

        {reviews.length > 0 ? (
          <ul className="mt-12 -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal
                as="li"
                key={review.name + i}
                delay={i * 80}
                className="w-[85vw] shrink-0 snap-start sm:w-auto"
              >
                <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={
                          s < review.rating
                            ? "h-4 w-4 fill-primary text-primary"
                            : "h-4 w-4 text-muted-foreground"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold">{review.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10">
            <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-border bg-surface p-8 sm:p-10">
              <MessageSquareQuote
                className="h-6 w-6 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="max-w-xl text-muted-foreground">
                Verified customer reviews will be published here. If you have visited AutoLink, we
                would be glad to hear about your experience.
              </p>
              {business.googleReviewsUrl ? (
                <a
                  href={business.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground"
                >
                  View Google Reviews
                </a>
              ) : (
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Contact Our Team
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
