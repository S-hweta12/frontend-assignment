import React, {useState} from "react";
import { useDrag, useDrop } from "react-dnd";

import { ImageData } from "../../interfaces/imageDataInterface";
import Loader from "../Loader/Loader";
import './Images.css';

interface ImageCardProps {
  item: ImageData;
  index: number;
  onClick: (item: ImageData) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, index, onClick, moveCard }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: item.type, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "card",
    hover(draggedItem: { id: string; index: number }) {
      if (!ref.current) {
        return;
      }

      if (draggedItem.index === index) {
        return;
      }

      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="card"
      onClick={() => onClick(item)}
    >
      <h3>{item.title}</h3>
      <div className="position-relative d-inline-block">
        {loading && <Loader className="loader-wrapper"/>}
        <img
          alt={item.title}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          src={`/assets/${item.type}.jpg`}
        />
      </div>
    </div>
  );
};

export default ImageCard;
