import React, { useEffect, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import useGreetStore from "../../../store/greetStore";
import {  FiGift } from 'react-icons/fi';
import GreetCard from '../Card/GreetCard.jsx';

const GreetFeed = () => {
  const { greet, fetchGreet, isLoading, error } = useGreetStore();

  useEffect(() => {
    fetchGreet();
  }, [fetchGreet]);

  const combinedList = [
    ...greet.birthdays.map(item => ({ ...item, type: "birthday" })),
    ...greet.anniversaries.map(item => ({ ...item, type: "anniversary" }))
  ];

  const sizeMap = useRef({});
  const getSize = index => sizeMap.current[index] || 100;
  const setSize = (index, size) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      if (listRef.current) listRef.current.resetAfterIndex(index);
    }
  };

  const listRef = useRef();

  const Row = ({ index, style }) => {
    const rowRef = useRef();

    useEffect(() => {
      if (rowRef.current) {
        const height = rowRef.current.getBoundingClientRect().height;
        setSize(index, height);
      }
    }, [index, combinedList]);

    const item = combinedList[index];

    return (
      <div style={style} className=' ml-3'>
        <div ref={rowRef} style={{ padding: '10px' }} className=''>
          <GreetCard post={item} type={item.type} />
        </div>
      </div>
    );
  };

  if (error) return <div className="p-4 bg-red-100 text-red-700 mb-4">{error}</div>;
  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (combinedList.length === 0) return <p className="text-center py-10 text-gray-500">No items to display.</p>;

  return (
    <div className="sidebar-scrollbar" style={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
      <List
        ref={listRef}
        height={window.innerHeight}
        width={'100%'}
        itemCount={combinedList.length}
        itemSize={getSize}
        estimatedItemSize={100}
        style={{ overflow: 'visible' }} 
      >
        {Row}
      </List>
    </div>
  );
};

export default GreetFeed;
