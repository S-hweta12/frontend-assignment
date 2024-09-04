import { ImageData } from "./imageDataInterface";

export interface ModalProps {
  data: ImageData;
  onClose: () => void;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
