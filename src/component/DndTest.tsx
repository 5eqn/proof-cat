import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export function DndTest() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable id='a'>Drag me</Draggable>
  );
  const draggableMarkup2 = (
    <Draggable id='b'>Drag me</Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {draggableMarkup}
      <Droppable>
        {isDropped ? draggableMarkup2 : 'Drop here'}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    } else if (event.active && event.active.id === 'b') {
      setIsDropped(false);
    }
  }
}
