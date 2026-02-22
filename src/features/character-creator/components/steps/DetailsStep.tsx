import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepHeader } from "../shared/StepHeader";
import { useCreatorStore } from "../../store/creatorStore";

export function DetailsStep() {
  const details = useCreatorStore((state) => state.details);
  const level = useCreatorStore((state) => state.level);
  const setDetails = useCreatorStore((state) => state.setDetails);
  const setLevel = useCreatorStore((state) => state.setLevel);

  return (
    <div className="space-y-6">
      <StepHeader
        title="Детали персонажа"
        description="Имя, мировоззрение и краткая история"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Имя</Label>
          <Input
            value={details.name}
            onChange={(event) => setDetails({ name: event.target.value })}
            placeholder="Например, Боромир"
          />
        </div>

        <div className="space-y-2">
          <Label>Мировоззрение</Label>
          <Input
            value={details.alignment}
            onChange={(event) => setDetails({ alignment: event.target.value })}
            placeholder="Lawful Good"
          />
        </div>

        <div className="space-y-2">
          <Label>Уровень</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={String(level)}
            onChange={(event) => setLevel(Number(event.target.value) || 1)}
          />
        </div>

        <div className="space-y-2">
          <Label>Возраст</Label>
          <Input
            value={details.age}
            onChange={(event) => setDetails({ age: event.target.value })}
            placeholder="27"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Черты характера</Label>
          <Textarea
            value={details.personalityTraits}
            onChange={(event) =>
              setDetails({ personalityTraits: event.target.value })
            }
            rows={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Предыстория</Label>
          <Textarea
            value={details.backstory}
            onChange={(event) => setDetails({ backstory: event.target.value })}
            rows={6}
          />
        </div>
      </div>
    </div>
  );
}
