// DraggablePicture.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggablePictureProps {
  id: string;
  url: string;
}

const DraggablePicture: React.FC<DraggablePictureProps> = ({ id, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={url}
      style={{
        width: '2in', // Adjust based on your requirements
        height: '2in',
        border: isDragging ? '2px dashed gray' : 'none',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
      alt={`Draggable item ${id}`}
    />
  );
};

export default DraggablePicture;
