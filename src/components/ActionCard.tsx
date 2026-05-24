import { QuickActionType } from "@/constants";
import { Card } from "./ui/card";

function ActionCard({
  action,
  onClick,
}: {
  action: QuickActionType;
  onClick: () => void;
}) {
  return (
    <Card
      className="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Action Gradient */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${action.gradient} opacity-100 transition-opacity group-hover:opacity-50`}
      />

      {/* Action Content Wrapper */}
      <div className="relative size-full p-6">
        <div className="space-y-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${action.iconBg}`}
          >
            <action.icon className={`h-6 w-6 ${action.iconColor}`} />
          </div>

          {/* Action Details */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;
