export interface TaskTitlePropsType {
  title: string;
  onSave?: () => void;
  snowButton: { onClick: () => void; isON: boolean };
}
