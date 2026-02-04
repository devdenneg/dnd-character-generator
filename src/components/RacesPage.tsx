import { useBackendRacesMeta, useBackendRaceByExternalId } from "@/api/hooks";
import { racesApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SlideOverDrawer } from "@/components/ui/slide-over-drawer";
import {
  Users,
  Zap,
  Skull,
  Flame,
  Mountain,
  Feather,
  Circle,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";
import type { ElementType } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

// Types
interface RaceTrait {
  id: string;
  name: string;
  nameRu: string;
  description: string;
}

interface Race {
  id: string;
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  speed: number;
  size: "Small" | "Medium" | "Large";
  source: string;
  traits: RaceTrait[];
}

interface RaceFormData {
  externalId: string;
  name: string;
  nameRu: string;
  description: string;
  speed: number;
  size: "Small" | "Medium" | "Large";
  source: string;
  traits: RaceTrait[];
}

const RACE_ICONS: Record<string, ElementType> = {
  aasimar: Zap,
  dragonborn: Flame,
  dwarf: Mountain,
  elf: Users,
  gnome: Feather,
  goliath: Mountain,
  halfling: Circle,
  human: Users,
  orc: Skull,
  tiefling: Skull,
};

const SIZES = [
  { value: "Small", label: "Малый" },
  { value: "Medium", label: "Средний" },
  { value: "Large", label: "Большой" },
];

const SOURCES = [
  { value: "srd", label: "SRD" },
  { value: "phb2024", label: "PHB 2024" },
];

interface RacesPageProps {
  onBack?: () => void;
}

export function RacesPage({ onBack }: RacesPageProps) {
  // Загружаем только мета-данные для списка
  const { data: metaData, isLoading, error, refetch } = useBackendRacesMeta();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Текущая выбранная раса определяется из URL
  const selectedRaceExternalId = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return hash || null;
  }, [location.hash]);

  // Загружаем полные данные только для выбранной расы
  const { data: selectedRaceData, isLoading: isLoadingRace } = useBackendRaceByExternalId(
    selectedRaceExternalId || ""
  );

  const selectedRace = selectedRaceData?.data?.race || null;

  // Функция для закрытия drawer
  const closeDrawer = () => {
    navigate(location.pathname, { replace: true });
  };
  const [editingRace, setEditingRace] = useState<RaceFormData>({
    externalId: "",
    name: "",
    nameRu: "",
    description: "",
    speed: 30,
    size: "Medium",
    source: "phb2024",
    traits: [],
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTrait, setNewTrait] = useState<
    Pick<RaceTrait, "name" | "nameRu" | "description">
  >({
    name: "",
    nameRu: "",
    description: "",
  });

  // Create race mutation
  const createRaceMutation = useMutation({
    mutationFn: (data: RaceFormData) => racesApi.create(data),
    onSuccess: () => {
      refetch();
      setIsCreateModalOpen(false);
      resetCreateForm();
    },
  });

  // Update race mutation
  const updateRaceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RaceFormData }) =>
      racesApi.update(id, data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      closeDrawer();
      resetCreateForm();
    },
  });

  // Delete race mutation
  const deleteRaceMutation = useMutation({
    mutationFn: racesApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      closeDrawer();
      resetCreateForm();
    },
  });

  const resetCreateForm = () => {
    setEditingRace({
      externalId: "",
      name: "",
      nameRu: "",
      description: "",
      speed: 30,
      size: "Medium",
      source: "phb2024",
      traits: [],
    });
  };

  const handleCreateRace = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleEditRace = (race: Race) => {
    setEditingRace({
      externalId: race.externalId,
      name: race.name,
      nameRu: race.nameRu,
      description: race.description,
      speed: race.speed,
      size: race.size,
      source: race.source,
      traits: race.traits,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveRace = () => {
    if (
      !editingRace.externalId ||
      !editingRace.name ||
      !editingRace.nameRu ||
      !editingRace.description
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (isCreateModalOpen) {
      // Create new race
      createRaceMutation.mutate({
        externalId: editingRace.externalId,
        name: editingRace.name,
        nameRu: editingRace.nameRu,
        description: editingRace.description,
        speed: editingRace.speed,
        size: editingRace.size,
        source: editingRace.source,
        traits: editingRace.traits,
      });
    } else {
      // Update existing race
      updateRaceMutation.mutate({
        id: selectedRace!,
        data: {
          externalId: editingRace.externalId,
          name: editingRace.name,
          nameRu: editingRace.nameRu,
          description: editingRace.description,
          speed: editingRace.speed,
          size: editingRace.size,
          source: editingRace.source,
          traits: editingRace.traits,
        },
      });
    }
  };

  const handleAddTrait = () => {
    if (!newTrait.name || !newTrait.nameRu || !newTrait.description) {
      alert("Пожалуйста, заполните все поля черты");
      return;
    }

    const traitsArray = editingRace.traits || [];
    const newTraitWithId = { ...newTrait, id: Date.now().toString() };

    setEditingRace({
      ...editingRace,
      traits: [...traitsArray, newTraitWithId],
    });

    setNewTrait({ name: "", nameRu: "", description: "" });
  };

  const handleRemoveTrait = (traitId: string) => {
    const traitsArray = editingRace.traits || [];
    setEditingRace({
      ...editingRace,
      traits: traitsArray.filter((t: RaceTrait) => t.id !== traitId),
    });
  };

  const canEdit = user?.role === "master";

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full p-6 rounded-2xl border bg-card/60 backdrop-blur-sm border-border/50 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Ошибка загрузки рас
            </h2>
            <p className="text-sm text-destructive/80">
              Не удалось загрузить данные о расах с сервера. Пожалуйста,
              попробуйте позже.
            </p>
            {onBack && (
              <Button variant="outline" className="mt-4" onClick={onBack}>
                Назад
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const races = metaData?.data?.races || [];

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pt-8 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  ← Назад
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-foreground">Расы</h1>
                <p className="text-sm text-muted-foreground">
                  {races.length} рас
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateRace} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Создать
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {races.map((race: Race, index: number) => {
            const Icon = RACE_ICONS[race.externalId] || Users;

            return (
              <button
                key={race.id + index}
                id={`race-${race.id}`}
                onClick={() => navigate(`${location.pathname}#${race.externalId}`)}
                className="w-full text-left p-4 rounded-lg border transition-all bg-card border-border hover:border-primary/50"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {race.nameRu}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {race.name}
                    </p>
                    <div className="flex items-center gap-1 flex-wrap mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {race.speed} фт
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {race.size === "Medium"
                          ? "Средний"
                          : race.size === "Small"
                          ? "Малый"
                          : "Большой"}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                        {(race.traits as RaceTrait[])?.length || 0} черт
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Slide-over Drawer for Race Details */}
        {selectedRaceExternalId && (
          <SlideOverDrawer
            isOpen={!!selectedRaceExternalId}
            onClose={closeDrawer}
            title={
              <div className="flex items-center gap-3">
                {isLoadingRace ? (
                  <>
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span>Загрузка...</span>
                  </>
                ) : selectedRace ? (
                  <>
                    {(() => {
                      const Icon = RACE_ICONS[selectedRace.externalId] || Users;
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                    <span>{selectedRace.nameRu || "Раса"}</span>
                  </>
                ) : (
                  <span>Раса</span>
                )}
              </div>
            }
            actions={
              canEdit && selectedRace && !isLoadingRace && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditRace(selectedRace)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (selectedRace && confirm(`Удалить расу "${selectedRace.nameRu}"?`)) {
                        deleteRaceMutation.mutate(selectedRace.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          >
            {isLoadingRace ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : selectedRace ? (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Описание
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedRace.description}
                  </p>
                </div>

                {/* Basic Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <span className="text-muted-foreground text-xs block mb-1">
                      Скорость
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedRace.speed} фт
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <span className="text-muted-foreground text-xs block mb-1">
                      Размер
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedRace.size === "Medium"
                        ? "Средний"
                        : selectedRace.size === "Small"
                        ? "Малый"
                        : "Большой"}
                    </span>
                  </div>
                </div>

                {/* Traits */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Черты расы
                  </h3>
                  <div className="space-y-3">
                    {(selectedRace.traits as RaceTrait[])?.map((trait: RaceTrait) => (
                      <div
                        key={trait.id}
                        className="p-4 rounded-xl bg-muted/30 border border-border/30"
                      >
                        <div className="mb-1">
                          <h5 className="font-medium text-foreground text-sm">
                            {trait.nameRu}
                          </h5>
                          <span className="text-xs text-muted-foreground/70">
                            {trait.name}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {trait.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </SlideOverDrawer>
        )}

        {races.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Нет рас
            </h3>
            <p className="text-sm text-muted-foreground">
              Расы пока не загружены
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-content">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen ? "Создать расу" : "Редактировать расу"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                  resetCreateForm();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-3">
              {/* Основная информация - сетка 2 колонки */}
              <div className="grid grid-cols-2 gap-3">
                {/* External ID */}
                <div className="space-y-1">
                  <Label htmlFor="externalId" className="text-xs">
                    Внешний ID *
                  </Label>
                  <Input
                    id="externalId"
                    value={editingRace.externalId}
                    onChange={(e) =>
                      setEditingRace({
                        ...editingRace,
                        externalId: e.target.value,
                      })
                    }
                    placeholder="dragonborn"
                    disabled={!isCreateModalOpen}
                    className="h-8 text-sm"
                  />
                </div>

                {/* Name (Russian) */}
                <div className="space-y-1">
                  <Label htmlFor="nameRu" className="text-xs">
                    Название (RU) *
                  </Label>
                  <Input
                    id="nameRu"
                    value={editingRace.nameRu}
                    onChange={(e) =>
                      setEditingRace({ ...editingRace, nameRu: e.target.value })
                    }
                    placeholder="Драконорождённый"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Name (English) */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs">
                    Название (EN) *
                  </Label>
                  <Input
                    id="name"
                    value={editingRace.name}
                    onChange={(e) =>
                      setEditingRace({ ...editingRace, name: e.target.value })
                    }
                    placeholder="Dragonborn"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Source */}
                <div className="space-y-1">
                  <Label htmlFor="source" className="text-xs">
                    Источник *
                  </Label>
                  <Select
                    id="source"
                    options={SOURCES}
                    value={editingRace.source}
                    placeholder="Источник"
                    onChange={(e) =>
                      setEditingRace({
                        ...editingRace,
                        source: e.target.value as string,
                      })
                    }
                    className="h-8 text-sm"
                  />
                </div>

                {/* Speed */}
                <div className="space-y-1">
                  <Label htmlFor="speed" className="text-xs">
                    Скорость (футы) *
                  </Label>
                  <Input
                    id="speed"
                    type="number"
                    value={editingRace.speed}
                    onChange={(e) =>
                      setEditingRace({
                        ...editingRace,
                        speed: parseInt(e.target.value) || 30,
                      })
                    }
                    min="20"
                    max="40"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Size */}
                <div className="space-y-1">
                  <Label htmlFor="size" className="text-xs">
                    Размер *
                  </Label>
                  <Select
                    id="size"
                    options={SIZES}
                    value={editingRace.size}
                    placeholder="Размер"
                    onChange={(e) =>
                      setEditingRace({
                        ...editingRace,
                        size: e.target.value as "Small" | "Medium" | "Large",
                      })
                    }
                    className="h-8 text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label htmlFor="description" className="text-xs">
                  Описание *
                </Label>
                <Textarea
                  id="description"
                  value={editingRace.description}
                  onChange={(e) =>
                    setEditingRace({
                      ...editingRace,
                      description: e.target.value,
                    })
                  }
                  placeholder="Описание расы..."
                  rows={3}
                  className="text-sm"
                />
              </div>

              {/* Traits */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">
                    Черты расы ({editingRace.traits.length})
                  </Label>
                </div>

                {/* Add New Trait Form */}
                <div className="p-3 rounded-lg bg-muted/20 border border-border/30 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="w-3 h-3" />
                    <span className="text-xs font-medium">Добавить черту</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="newTraitName" className="text-xs">
                        Название (EN) *
                      </Label>
                      <Input
                        id="newTraitName"
                        value={newTrait.name}
                        onChange={(e) =>
                          setNewTrait({ ...newTrait, name: e.target.value })
                        }
                        placeholder="Draconic Ancestry"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newTraitNameRu" className="text-xs">
                        Название (RU) *
                      </Label>
                      <Input
                        id="newTraitNameRu"
                        value={newTrait.nameRu}
                        onChange={(e) =>
                          setNewTrait({ ...newTrait, nameRu: e.target.value })
                        }
                        placeholder="Драконья кровь"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="newTraitDescription" className="text-xs">
                      Описание *
                    </Label>
                    <Textarea
                      id="newTraitDescription"
                      value={newTrait.description}
                      onChange={(e) =>
                        setNewTrait({
                          ...newTrait,
                          description: e.target.value,
                        })
                      }
                      placeholder="Описание черты..."
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <Button
                    onClick={handleAddTrait}
                    size="sm"
                    className="w-full gap-2 h-8"
                    disabled={
                      !newTrait.name ||
                      !newTrait.nameRu ||
                      !newTrait.description
                    }
                  >
                    <Plus className="w-4 h-4" />
                    Добавить черту
                  </Button>
                </div>

                {/* Existing Traits List */}
                {editingRace.traits.length > 0 && (
                  <div className="space-y-2">
                    <h6 className="text-xs font-medium text-muted-foreground">
                      Добавленные черты:
                    </h6>
                    {editingRace.traits.map(
                      (trait: RaceTrait, index: number) => (
                        <div
                          key={trait.id || index}
                          className="p-2 rounded-lg bg-card border border-border/50 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                              Черта #{index + 1}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6 p-0"
                              onClick={() =>
                                handleRemoveTrait(trait.id || index.toString())
                              }
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label
                                htmlFor={`trait-name-${index}`}
                                className="text-xs"
                              >
                                Название (EN)
                              </Label>
                              <Input
                                id={`trait-name-${index}`}
                                value={trait.name}
                                onChange={(e) => {
                                  const traitsArray = editingRace.traits || [];
                                  const updatedTraits = [...traitsArray];
                                  updatedTraits[index] = {
                                    ...updatedTraits[index],
                                    name: e.target.value,
                                  };
                                  setEditingRace({
                                    ...editingRace,
                                    traits: updatedTraits,
                                  });
                                }}
                                placeholder="Название (англ)"
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`trait-nameRu-${index}`}
                                className="text-xs"
                              >
                                Название (RU)
                              </Label>
                              <Input
                                id={`trait-nameRu-${index}`}
                                value={trait.nameRu}
                                onChange={(e) => {
                                  const traitsArray = editingRace.traits || [];
                                  const updatedTraits = [...traitsArray];
                                  updatedTraits[index] = {
                                    ...updatedTraits[index],
                                    nameRu: e.target.value,
                                  };
                                  setEditingRace({
                                    ...editingRace,
                                    traits: updatedTraits,
                                  });
                                }}
                                placeholder="Название (рус)"
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={`trait-desc-${index}`}
                              className="text-xs"
                            >
                              Описание
                            </Label>
                            <Textarea
                              id={`trait-desc-${index}`}
                              value={trait.description}
                              onChange={(e) => {
                                const traitsArray = editingRace.traits || [];
                                const updatedTraits = [...traitsArray];
                                updatedTraits[index] = {
                                  ...updatedTraits[index],
                                  description: e.target.value,
                                };
                                setEditingRace({
                                  ...editingRace,
                                  traits: updatedTraits,
                                });
                              }}
                              placeholder="Описание черты"
                              rows={2}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    resetCreateForm();
                  }}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveRace}
                  disabled={
                    createRaceMutation.isPending || updateRaceMutation.isPending
                  }
                  className="gap-2 flex-1"
                >
                  <Save className="w-3 h-3" />
                  {isCreateModalOpen ? "Создать" : "Сохранить"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
