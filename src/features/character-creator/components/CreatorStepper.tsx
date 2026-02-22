import { CREATOR_STEPS } from "../utils/constants";
import { useCreatorStore } from "../store/creatorStore";

export function CreatorStepper() {
  const step = useCreatorStore((state) => state.step);
  const setStep = useCreatorStore((state) => state.setStep);

  const currentIndex = CREATOR_STEPS.findIndex((item) => item.key === step);

  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {CREATOR_STEPS.map((item, index) => {
        const isCurrent = item.key === step;
        const isCompleted = index < currentIndex;

        return (
          <button
            key={item.key}
            onClick={() => setStep(item.key)}
            className={`rounded-lg border px-3 py-2 text-left transition ${
              isCurrent
                ? "border-primary bg-primary/10"
                : isCompleted
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-border bg-card/50"
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Шаг {index + 1}</p>
            <p className="text-sm font-semibold">{item.title}</p>
          </button>
        );
      })}
    </div>
  );
}
