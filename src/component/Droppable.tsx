import { useDroppable } from '@dnd-kit/core';

export interface DroppableProps {
  id: string,
  children?: JSX.Element[] | JSX.Element,
}

export function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    border: isOver ? 'solid #ffcccc' : undefined,
  };

  return <div ref={setNodeRef} style={style}>
    {props.children}
  </div>
}
