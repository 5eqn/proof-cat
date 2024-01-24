import { useDraggable } from '@dnd-kit/core';

export interface DraggableProps {
  id: string,
  children?: JSX.Element[] | JSX.Element,
}

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
