import { featsApi } from "@/api/client";
import { Input } from "@/components/ui/input";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import { FeatFull, FeatMeta } from "@/types/api";
import { parseEquipmentDescription } from "@/utils/descriptionParser";
import { Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FeatsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Feats state
  const [feats, setFeats] = useState<FeatMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // URL state
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || ""
  );

  // Selected feat from hash
  const selectedFeatId = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return hash || null;
  }, [location.hash]);

  // Selected feat data
  const [selectedFeat, setSelectedFeat] = useState<FeatFull | null>(null);
  const [loadingFeat, setLoadingFeat] = useState(false);



  // Fetch feats list
  useEffect(() => {
    setLoading(true);
    featsApi.list(searchQuery)
      .then((data) => {
        if (data.success) {
          setFeats(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  // Fetch full feat data
  useEffect(() => {
    if (!selectedFeatId) {
      setSelectedFeat(null);
      return;
    }

    setLoadingFeat(true);
    featsApi.get(selectedFeatId)
      .then((data) => {
        if (data.success) {
          setSelectedFeat(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingFeat(false));
  }, [selectedFeatId]);

  // Navigation management
  useEffect(() => {
    const params = new URLSearchParams();
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
  }, [searchQuery, navigate, location.pathname, location.hash, location.search]);

  const openFeat = (id: string) => {
    navigate(`${location.pathname}${location.search}#${id}`, { replace: false });
  };

  const closeDrawer = () => {
    navigate(`${location.pathname}${location.search}`, { replace: true });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pt-8 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Черты</h1>
              <p className="text-sm text-muted-foreground">
                {feats.length} черт доступно
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск черты..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Feats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : feats.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Ничего не найдено
            </h3>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {feats.map((feat) => (
              <div
                key={feat.id}
                onClick={() => openFeat(feat.id)}
                className="p-4 rounded-lg border cursor-pointer transition-all bg-card border-border hover:border-primary/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500 to-orange-600">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {feat.nameRu}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {feat.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {feat.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer for Feat Details */}
      {selectedFeatId && (
        <SlideOverDrawer
          isOpen={!!selectedFeatId}
          onClose={closeDrawer}
          title={
            <div className="flex flex-col">
              {loadingFeat ? (
                <div className="h-6 bg-muted/50 rounded w-48 animate-pulse" />
              ) : selectedFeat ? (
                <>
                  <h2 className="text-xl font-bold">{selectedFeat.nameRu}</h2>
                  <p className="text-sm text-muted-foreground">{selectedFeat.name}</p>
                </>
              ) : (
                <span>Загрузка...</span>
              )}
            </div>
          }
        >
          {loadingFeat ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted/30 rounded animate-pulse" />
              ))}
            </div>
          ) : selectedFeat ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                  {selectedFeat.category}
                </span>
                {selectedFeat.prerequisite && (
                  <span className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-500 font-medium">
                    Требование: {selectedFeat.prerequisite}
                  </span>
                )}
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                  {selectedFeat.source}
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                {parseEquipmentDescription(selectedFeat.description)}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Черта не найдена</p>
            </div>
          )}
        </SlideOverDrawer>
      )}
    </>
  );
}
