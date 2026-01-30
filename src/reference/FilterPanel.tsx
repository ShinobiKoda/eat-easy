import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MainCategory,
  ProductType,
  PRODUCT_TYPES,
  RATING_OPTIONS,
  PRICE_MIN,
  PRICE_MAX,
  FilterState,
} from "@/types/menu";
import { Slider } from "@/components/ui/slider";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mainCategory: MainCategory;
  currentFilters: Omit<FilterState, "mainCategory">;
  onApplyFilters: (filters: Omit<FilterState, "mainCategory">) => void;
}

export function FilterPanel({
  isOpen,
  onClose,
  mainCategory,
  currentFilters,
  onApplyFilters,
}: FilterPanelProps) {
  // Local state for pending filter changes
  const [pendingProductTypes, setPendingProductTypes] = useState<ProductType[]>(
    currentFilters.productTypes
  );
  const [pendingRatings, setPendingRatings] = useState<number[]>(
    currentFilters.ratings
  );
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>(
    currentFilters.priceRange
  );

  // Sync local state when panel opens or main category changes
  useEffect(() => {
    if (isOpen) {
      setPendingProductTypes(currentFilters.productTypes);
      setPendingRatings(currentFilters.ratings);
      setPendingPriceRange(currentFilters.priceRange);
    }
  }, [isOpen, currentFilters]);

  const isProductTypeDisabled = mainCategory !== "EAT";

  const toggleProductType = (type: ProductType) => {
    if (isProductTypeDisabled) return;
    setPendingProductTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleRating = (rating: number) => {
    setPendingRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      productTypes: isProductTypeDisabled ? [] : pendingProductTypes,
      ratings: pendingRatings,
      priceRange: pendingPriceRange,
    });
    onClose();
  };

  const handleClearAll = () => {
    setPendingProductTypes([]);
    setPendingRatings([]);
    setPendingPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const activeFiltersCount =
    pendingProductTypes.length +
    pendingRatings.length +
    (pendingPriceRange[0] !== PRICE_MIN || pendingPriceRange[1] !== PRICE_MAX
      ? 1
      : 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 filter-panel animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Filters</h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""}{" "}
                selected
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
          {/* Product Type Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Product Type</h3>
              {isProductTypeDisabled && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Only for Eat
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleProductType(type)}
                  disabled={isProductTypeDisabled}
                  className={cn(
                    "filter-chip capitalize",
                    isProductTypeDisabled
                      ? "filter-chip-disabled"
                      : pendingProductTypes.includes(type)
                      ? "filter-chip-active"
                      : "filter-chip-inactive"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Food Rating</h3>
            <div className="flex flex-wrap gap-2">
              {RATING_OPTIONS.map((rating) => (
                <button
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className={cn(
                    "filter-chip flex items-center gap-1.5",
                    pendingRatings.includes(rating)
                      ? "filter-chip-active"
                      : "filter-chip-inactive"
                  )}
                >
                  <Star
                    className={cn(
                      "w-3.5 h-3.5",
                      pendingRatings.includes(rating)
                        ? "fill-current"
                        : "fill-none"
                    )}
                  />
                  <span>{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
            <div className="px-2">
              <Slider
                value={pendingPriceRange}
                onValueChange={(value) =>
                  setPendingPriceRange(value as [number, number])
                }
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-sm">
                <span className="font-medium text-foreground">
                  ${pendingPriceRange[0].toFixed(2)}
                </span>
                <span className="text-muted-foreground">to</span>
                <span className="font-medium text-foreground">
                  ${pendingPriceRange[1].toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full py-3 text-muted-foreground font-medium hover:text-foreground transition-colors"
            >
              Clear All Filters
            </button>
          )}
          <button
            onClick={handleApply}
            className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
}
