import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left: Dark Panel ── */}
      <div className="lg:w-1/2 bg-kicks-dark flex flex-col justify-center p-8 lg:p-16 h-full min-h-80 lg:min-h-screen">
        {/* Big 404 + label */}
        <div className="flex flex-col gap-3">
          <p className="font-rubik font-bold text-[120px] lg:text-[200px] leading-none text-kicks-yellow select-none">
            404
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-kicks-bg/20" />
            <span className="font-rubik font-semibold text-xs text-kicks-bg/50 uppercase tracking-[3px]">
              Error
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: Content Panel ── */}
      <div className="lg:w-1/2 bg-kicks-bg flex items-center justify-center px-8 lg:px-20 py-16 lg:py-0">
        <div className="flex flex-col gap-6 max-w-md w-full">
          {/* Badge */}
          <span className="self-start bg-kicks-blue text-white font-rubik font-semibold text-xs px-4 py-2 rounded-lg uppercase tracking-wider">
            Page not found
          </span>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="font-rubik font-semibold text-4xl lg:text-[56px] text-kicks-dark uppercase leading-tight">
              Lost your
              <br />
              sole?
            </h1>
            <p className="font-open-sans text-base text-kicks-dark/60 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back
              on track.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-kicks-dark/10 w-full" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="dark" size="md" href="/" className="px-8">
              Back to Home
            </Button>
            <Button variant="outline" size="md" href="/products" className="px-8">
              Shop Now
            </Button>
          </div>

          {/* Help link */}
          <p className="font-open-sans text-sm text-kicks-dark/40">
            Think this is a mistake?{" "}
            <Link href="/" className="text-kicks-blue hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
