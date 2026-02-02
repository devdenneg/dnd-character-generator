import { useBackendRaces } from "@/api/hooks";
import { racesApi } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Users,
  ChevronRight,
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
} from "lucide-react";
import { useState } from "react";
import type { ElementType } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

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
  const { data, isLoading, error, refetch } = useBackendRaces();
  const { user } = useAuth();
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
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
  const [newTrait, setNewTrait] = useState<Pick<RaceTrait, "name" | "nameRu" | "description">>({
    name: "",
    nameRu: "",
    description: "",
  });

  // Selected race data query
  const selectedRaceData = useQuery({
    queryKey: ["race", selectedRace],
    queryFn: () => racesApi.get(selectedRace!),
    enabled: !!selectedRace,
    staleTime: Infinity,
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
      setSelectedRace(null);
      resetCreateForm();
    },
  });

  // Delete race mutation
  const deleteRaceMutation = useMutation({
    mutationFn: racesApi.delete,
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
      setSelectedRace(null);
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
    if (!editingRace.externalId || !editingRace.name || !editingRace.nameRu || !editingRace.description) {
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
              Не удалось загрузить данные о расах с сервера. Пожалуйста, попробуйте
              позже.
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

  const races = data?.data?.races || [];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {onBack && (
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack}>
              ← Назад
            </Button>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Расы PHB 2024</h1>
                <p className="text-sm text-muted-foreground">
                  официальные расы из Книги игрока 2024
                </p>
              </div>
            </div>

            {canEdit && (
              <Button onClick={handleCreateRace} className="gap-2">
                <Plus className="w-4 h-4" />
                Создать расу
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Загружено рас: <span className="font-semibold text-foreground">{races.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {races.map((race: Race, index: number) => {
            const Icon = RACE_ICONS[race.externalId] || Users;
            const isSelected = selectedRace === race.id;

            return (
              <div key={race.id} className="space-y-4">
                <button
                  onClick={() => setSelectedRace(isSelected ? null : race.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                    isSelected
                      ? "bg-card/80 border-primary/50 ring-2 ring-primary/20"
                      : "bg-card/60 border-border/50 hover:border-primary/30 hover:bg-card/80"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-accent ${
                        !isSelected && "hover:scale-110"
                      } transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {race.nameRu}
                        </h3>
                        {canEdit && isSelected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditRace(race);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        )}
                        {!canEdit && (
                          <ChevronRight
                            className={`w-5 h-5 text-muted-foreground transition-all ${
                              isSelected ? "rotate-90 text-primary" : ""
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {race.name}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          Скорость: {race.speed} футов
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                          Размер: {race.size === "Medium" ? "Средний" : race.size === "Small" ? "Малый" : "Большой"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted/50">
                          {(race.traits as RaceTrait[])?.length || 0} черт
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="bg-card/80 border border-primary/20 rounded-2xl p-6 mt-2 animate-fade-in">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Описание</h4>
                      {canEdit && selectedRaceData.data?.data?.race && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-1"
                          onClick={() => {
                            if (confirm(`Вы уверены, что хотите удалить расу "${selectedRaceData.data.data.race.nameRu}"?`)) {
                              deleteRaceMutation.mutate(selectedRace);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {race.description}
                    </p>

                    <h4 className="font-semibold text-foreground mb-2">Черты</h4>
                    <div className="space-y-3">
                      {(race.traits as RaceTrait[])?.map((trait: RaceTrait) => (
                        <div
                          key={trait.id}
                          className="p-4 rounded-xl bg-muted/30 border border-border/30"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div>
                              <h5 className="font-medium text-foreground text-sm">
                                {trait.nameRu}
                              </h5>
                              <span className="text-xs text-muted-foreground/70">
                                {trait.name}
                              </span>
                            </div>
                            {canEdit && isSelected && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive p-1 h-6 w-6"
                                onClick={() => handleRemoveTrait(trait.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trait.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateModalOpen ? "Создать расу" : "Редактировать расу"}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditModalOpen(false);
                resetCreateForm();
              }}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* External ID */}
              <div className="space-y-2">
                <Label htmlFor="externalId">Внешний ID *</Label>
                <Input
                  id="externalId"
                  value={editingRace.externalId}
                  onChange={(e) => setEditingRace({ ...editingRace, externalId: e.target.value })}
                  placeholder="Например: dragonborn"
                  disabled={!isCreateModalOpen}
                />
                <p className="text-xs text-muted-foreground">
                  Уникальный идентификатор, используется в коде. Можно изменить только при создании.
                </p>
              </div>

              {/* Name (Russian) */}
              <div className="space-y-2">
                <Label htmlFor="nameRu">Название (русский) *</Label>
                <Input
                  id="nameRu"
                  value={editingRace.nameRu}
                  onChange={(e) => setEditingRace({ ...editingRace, nameRu: e.target.value })}
                  placeholder="Например: Драконорождённый"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <Label htmlFor="name">Название (английский) *</Label>
                <Input
                  id="name"
                  value={editingRace.name}
                  onChange={(e) => setEditingRace({ ...editingRace, name: e.target.value })}
                  placeholder="Например: Dragonborn"
                />
              </div>

              {/* Speed */}
              <div className="space-y-2">
                <Label htmlFor="speed">Скорость (футы) *</Label>
                <Input
                  id="speed"
                  type="number"
                  value={editingRace.speed}
                  onChange={(e) => setEditingRace({ ...editingRace, speed: parseInt(e.target.value) || 30 })}
                  min="20"
                  max="40"
                />
              </div>

              {/* Size */}
              <div className="space-y-2">
                <Label htmlFor="size">Размер *</Label>
                <Select
                  id="size"
                  options={SIZES}
                  value={editingRace.size}
                  placeholder="Выберите размер"
                  onChange={(e) => setEditingRace({ ...editingRace, size: e.target.value as "Small" | "Medium" | "Large" })}
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Источник *</Label>
                <Select
                  id="source"
                  options={SOURCES}
                  value={editingRace.source}
                  placeholder="Выберите источник"
                  onChange={(e) => setEditingRace({ ...editingRace, source: e.target.value as string })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Описание *</Label>
                <Textarea
                  id="description"
                  value={editingRace.description}
                  onChange={(e) => setEditingRace({ ...editingRace, description: e.target.value })}
                  placeholder="Описание расы..."
                  rows={4}
                />
              </div>

              {/* Traits */}
              <div className="space-y-2">
                <Label>Черты</Label>
                
                {/* Add New Trait Form */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 space-y-3">
                  <h5 className="font-medium text-foreground text-sm">Добавить новую черту</h5>
                  <Input
                    value={newTrait.name}
                    onChange={(e) => setNewTrait({ ...newTrait, name: e.target.value })}
                    placeholder="Название черты (англ)"
                  />
                  <Input
                    value={newTrait.nameRu}
                    onChange={(e) => setNewTrait({ ...newTrait, nameRu: e.target.value })}
                    placeholder="Название черты (рус)"
                  />
                  <Textarea
                    value={newTrait.description}
                    onChange={(e) => setNewTrait({ ...newTrait, description: e.target.value })}
                    placeholder="Описание черты"
                    rows={2}
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddTrait}
                    className="w-full gap-2"
                    disabled={!newTrait.name || !newTrait.nameRu || !newTrait.description}
                  >
                    <Plus className="w-4 h-4" />
                    Добавить черту в список
                  </Button>
                </div>

                {/* Existing Traits List */}
                <div className="space-y-3">
                  {editingRace.traits.map((trait: RaceTrait, index: number) => (
                    <div key={trait.id || index} className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={trait.name}
                            onChange={(e) => {
                              const traitsArray = editingRace.traits || [];
                              const updatedTraits = [...traitsArray];
                              updatedTraits[index] = { ...updatedTraits[index], name: e.target.value };
                              setEditingRace({ ...editingRace, traits: updatedTraits });
                            }}
                            placeholder="Название (англ)"
                          />
                          <Input
                            value={trait.nameRu}
                            onChange={(e) => {
                              const traitsArray = editingRace.traits || [];
                              const updatedTraits = [...traitsArray];
                              updatedTraits[index] = { ...updatedTraits[index], nameRu: e.target.value };
                              setEditingRace({ ...editingRace, traits: updatedTraits });
                            }}
                            placeholder="Название (рус)"
                          />
                          <Textarea
                            value={trait.description}
                            onChange={(e) => {
                              const traitsArray = editingRace.traits || [];
                              const updatedTraits = [...traitsArray];
                              updatedTraits[index] = { ...updatedTraits[index], description: e.target.value };
                              setEditingRace({ ...editingRace, traits: updatedTraits });
                            }}
                            placeholder="Описание черты"
                            rows={2}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-1"
                          onClick={() => handleRemoveTrait(trait.id || index.toString())}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    resetCreateForm();
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSaveRace}
                  disabled={createRaceMutation.isPending || updateRaceMutation.isPending}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isCreateModalOpen ? "Создать" : "Сохранить"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
