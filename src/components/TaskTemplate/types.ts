export interface TaskTemplatePropsType {
  variant?: VariantType;
  snowButton: { onClick: () => void; isON: boolean };
}
export type VariantType =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "default";
