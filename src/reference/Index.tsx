import { useState, useMemo } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { FilterPanel } from "@/components/menu/FilterPanel";
import { MenuGrid } from "@/components/menu/MenuGrid";
import {
  MainCategory,
  ProductType,
  FilterState,
  PRICE_MIN,
  PRICE_MAX,
} from "@/types/menu";
import { menuData, getItemsByCategory, filterItems } from "@/data/menuData";

const Index = () => {
  // Filter state
  const [mainCategory, setMainCategory] = useState<MainCategory>("EAT");
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);

  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get counts for each category
  const categoryCounts = useMemo(() => {
    return {
      EAT: menuData.filter((item) => item.category === "EAT").length,
      DRINK: menuData.filter((item) => item.category === "DRINK").length,
      DESSERT: menuData.filter((item) => item.category === "DESSERT").length,
    };
  }, []);

  // Filter items based on current filters
  const filteredItems = useMemo(() => {
    // Get items by main category
    let items = getItemsByCategory(mainCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply other filters (product type only for EAT category)
    const activeProductTypes = mainCategory === "EAT" ? productTypes : [];
    items = filterItems(items, activeProductTypes, ratings, priceRange);

    return items;
  }, [mainCategory, productTypes, ratings, priceRange, searchQuery]);

  // Handle category change - reset product types when switching away from EAT
  const handleCategoryChange = (category: MainCategory) => {
    setMainCategory(category);
    if (category !== "EAT") {
      setProductTypes([]);
    }
  };

  // Handle filter apply
  const handleApplyFilters = (
    filters: Omit<FilterState, "mainCategory">
  ) => {
    setProductTypes(filters.productTypes);
    setRatings(filters.ratings);
    setPriceRange(filters.priceRange);
  };

  // Count active filters
  const activeFilterCount =
    (mainCategory === "EAT" ? productTypes.length : 0) +
    ratings.length +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Food Menu</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Discover delicious meals, drinks & desserts
              </p>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Search & Category Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Category Tabs */}
            <CategoryTabs
              activeCategory={mainCategory}
              onCategoryChange={handleCategoryChange}
              counts={categoryCounts}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredItems.length}
            </span>{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Menu Grid */}
        <MenuGrid items={filteredItems} />
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        mainCategory={mainCategory}
        currentFilters={{
          productTypes,
          ratings,
          priceRange,
        }}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default Index;
