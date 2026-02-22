import { Button } from "@/components/ui/button";
import { CREATOR_STEPS } from "../utils/constants";
import { useCreatorStore } from "../store/creatorStore";

interface CreatorNavigationProps {
  canContinue: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

export function CreatorNavigation({
  canContinue,
  isSubmitting = false,
  onSubmit,
}: CreatorNavigationProps) {
  const step = useCreatorStore((state) => state.step);
  const nextStep = useCreatorStore((state) => state.nextStep);
  const prevStep = useCreatorStore((state) => state.prevStep);

  const currentIndex = CREATOR_STEPS.findIndex((item) => item.key === step);
  const isLastStep = currentIndex === CREATOR_STEPS.length - 1;

  return (
    <div className="flex items-center justify-between gap-3 pt-6">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentIndex === 0 || isSubmitting}
      >
        Назад
      </Button>

      {isLastStep ? (
        <Button onClick={onSubmit} disabled={!canContinue || isSubmitting}>
          {isSubmitting ? "Создание..." : "Создать персонажа"}
        </Button>
      ) : (
        <Button onClick={nextStep} disabled={!canContinue || isSubmitting}>
          Далее
        </Button>
      )}
    </div>
  );
}
