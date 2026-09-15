

/**
 * ============================================================================
 * Exercise 1 - Deployment Card
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Your team is building an internal Deployment Queue application used by
 * Release Engineers to monitor application deployments.
 *
 * A mock API response has been provided in src/data/MOCK_DATA.ts.
 *
 * In this exercise, your task is to build a reusable DeploymentCard component.
 *
 * ============================================================================
 *
 * ## Requirements

### 1. Component Setup

- Create a `DeploymentCard` component.
- Keep the provided imports unchanged.
- Use React with TypeScript.
- Use the existing Shadcn UI components:
  - Card
  - Badge
  - Button
  - Separator

---
### 2. Deployment Interface

Create the `Deployment` interface with the mockdata properties:
make sure 
environment: "Production" | "QA" | "Development" | "Staging";
status: "Pending" | "In Progress" | "Completed";
priority: "Low" | "Medium" | "High" | "Critical";



 * ============================================================================
 *
 * UI Requirements
 *
 * • Use the provided shadcn/ui components where appropriate.
 *
 * • Environment and Status should be displayed using badges.
 *
 * • Display a "advance to [next status]" button at the bottom of the card.
 *
 * • Use appropriate spacing and visual hierarchy.
 *
 * • The component should remain responsive.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • Use TypeScript.
 *
 * • Define appropriate interfaces/types.
 *
 * • Keep the component reusable.
 *
 * • Do not hardcode values.
 *
 * • Avoid unnecessary duplication.
 *
 * • Write clean, maintainable code.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * We will evaluate:
 *
 * ✓ React Fundamentals
 * ✓ Component Composition
 * ✓ TypeScript
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 *
 * Note
 *
 * This exercise focuses only on the DeploymentCard component.
 *
 * Additional requirements will be introduced in later exercises.
 *
 * ============================================================================
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface Deployment {
  id: string;
  application: string;
  version: string;
  environment: "Production" | "QA" | "Development" | "Staging";
  status: "Pending" | "In Progress" | "Completed";
  requestedBy: string;
  requestedAt: string;
  scheduledAt: string;
  region: string;
  priority: "Low" | "Medium" | "High" | "Critical";
}

interface DeploymentCardProps {
  deployment: DeploymentCardData;
  onAdvance?: (
    deployment: DeploymentCardData,
    nextStatus: Deployment["status"]
  ) => void;
}

type DeploymentCardData = Omit<Deployment, "environment" | "status" | "priority"> & {
  environment: string;
  status: string;
  priority: string;
};

const statusOrder: Deployment["status"][] = [
  "Pending",
  "In Progress",
  "Completed",
];

const DeploymentCard = ({ deployment, onAdvance }: DeploymentCardProps) => {
  const currentStatusIndex = statusOrder.indexOf(
    deployment.status as Deployment["status"]
  );
  const nextStatus = statusOrder[currentStatusIndex + 1];
  const formatRequestedDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const formatScheduledDate = (date: string) => new Date(date).toLocaleString();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-lg">{deployment.application}</CardTitle>
            <CardDescription>
              <span>{deployment.id}</span>
              <span aria-hidden="true"> · </span>
              <span>{deployment.version}</span>
            </CardDescription>
          </div>
          <Badge variant="outline">{deployment.priority}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{deployment.environment}</Badge>
          <Badge variant="secondary">{deployment.status}</Badge>
        </div>

        <Separator />

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Requested by</dt>
            <dd className="font-medium">{deployment.requestedBy}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Region</dt>
            <dd className="font-medium">{deployment.region}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Requested</dt>
            <dd className="font-medium">{formatRequestedDate(deployment.requestedAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Scheduled</dt>
            <dd className="font-medium">{formatScheduledDate(deployment.scheduledAt)}</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={!nextStatus}
          onClick={() => nextStatus && onAdvance?.(deployment, nextStatus)}
        >
          {nextStatus ? `Advance to ${nextStatus}` : "Deployment completed"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeploymentCard;
