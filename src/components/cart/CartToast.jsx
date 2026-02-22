"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectLastAddedItem, clearLastAdded } from "@/store";

export default function CartToast() {
  const dispatch = useDispatch();
  const lastAdded = useSelector(selectLastAddedItem);

  useEffect(() => {
    if (!lastAdded) return;
    const timer = setTimeout(() => dispatch(clearLastAdded()), 3000);
    return () => clearTimeout(timer);
  }, [lastAdded, dispatch]);

  if (!lastAdded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 animate-[toastIn_0.3s_ease-out] bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-sm border border-kicks-bg">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-kicks-bg shrink-0">
        <Image src={lastAdded.image} alt={lastAdded.title} fill className="object-cover" unoptimized />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-rubik font-semibold text-sm text-kicks-dark line-clamp-1">
          {lastAdded.title}
        </p>
        <p className="font-open-sans text-xs text-kicks-blue font-semibold">Added to bag</p>
      </div>
      <button
        onClick={() => dispatch(clearLastAdded())}
        className="text-kicks-dark/40 hover:text-kicks-dark transition-colors cursor-pointer text-lg leading-none"
        aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
