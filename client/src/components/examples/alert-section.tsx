import { AlertSection } from "../alert-section";

export default function AlertSectionExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AlertSection type="overdue" count={12} />
      <AlertSection type="upcoming" count={23} />
    </div>
  );
}
