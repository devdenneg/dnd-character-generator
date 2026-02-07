import { glossaryApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { GlossaryTermFull, GlossaryTermMeta } from "@/types/api";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { Book, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default function GlossaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Load only metadata for the list
  const [terms, setTerms] = useState<GlossaryTermMeta[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // URL state
  const searchParams = new URLSearchParams(location.search);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || ""
  );

  // Auto-switch to "all" category when search starts
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && selectedCategory !== "all") {
      setSelectedCategory("all");
    }
  };

  // Selected term from hash
  const selectedTermId = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return hash || null;
  }, [location.hash]);

  // Load full data for selected term
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTermFull | null>(null);
  const [loadingTerm, setLoadingTerm] = useState(false);


  // Fetch categories
  useEffect(() => {
    glossaryApi.getCategories()
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch terms metadata (lightweight)
  useEffect(() => {
    setLoading(true);
    glossaryApi.listMeta({
      category: selectedCategory,
      search: searchQuery
    })
      .then((data) => {
        if (data.success) {
          setTerms(data.data.terms);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  // Fetch full term data when selected
  useEffect(() => {
    if (!selectedTermId) {
      setSelectedTerm(null);
      return;
    }

    setLoadingTerm(true);
    glossaryApi.get(selectedTermId)
      .then((data) => {
        if (data.success) {
          setSelectedTerm(data.data.term);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingTerm(false));
  }, [selectedTermId]);

  // Sync state with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (searchQuery) params.set("search", searchQuery);

    const newSearch = params.toString();
    const currentSearch = location.search.replace("?", "");

    if (newSearch !== currentSearch) {
      navigate({
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : "",
        hash: location.hash,
      }, { replace: true });
    }
  }, [selectedCategory, searchQuery, navigate, location.pathname, location.hash, location.search]);

  const openTerm = (id: string) => {
    navigate(`${location.pathname}${location.search}#${id}`);
  };

  const closeDrawer = () => {
    if (location.hash) {
      navigate(`${location.pathname}${location.search}`);
    }
  };



  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pt-8 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Глоссарий</h1>
              <p className="text-sm text-muted-foreground">
                {terms.length} терминов
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск термина..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="gap-2"
            >
              <Book className="w-3 h-3" />
              Все
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : terms.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Book className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Ничего не найдено
            </h3>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {terms.map((term) => (
              <div
                key={term.id}
                onClick={() => openTerm(term.id)}
                className="p-4 rounded-lg border cursor-pointer transition-all bg-card border-border hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {term.nameRu}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {term.name}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
                    {term.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer for Term Details */}
      {selectedTermId && (
        <SlideOverDrawer
          isOpen={!!selectedTermId}
          onClose={closeDrawer}
          title={
            <div className="flex items-center gap-3">
              <div className="flex-1">
                {loadingTerm ? (
                  <div className="h-6 bg-muted/50 rounded w-48 animate-pulse" />
                ) : selectedTerm ? (
                  <>
                    <h2 className="text-xl font-bold">{selectedTerm.nameRu}</h2>
                    <p className="text-sm text-muted-foreground">{selectedTerm.name}</p>
                  </>
                ) : (
                  <span>Загрузка...</span>
                )}
              </div>
            </div>
          }
        >
          {loadingTerm ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted/30 rounded animate-pulse" />
              ))}
            </div>
          ) : selectedTerm ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                  {selectedTerm.category}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                  {selectedTerm.source}
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                {parseEquipmentDescription(selectedTerm.description)}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Термин не найден</p>
            </div>
          )}
        </SlideOverDrawer>
      )}
    </>
  );
}
