import { useState, useEffect } from 'react';  
import Feed from '../../components/engagement/Feed';
import FilterTab from '../../components/engagement/FilterFeed/FilterTab';
import GreetFeed from '../../components/engagement/todayCelebrate/GreetFeed';
import CreateCard from '../../components/engagement/Card/CreateCard';

const FeedPage = () => {
  const [category, setCategory] = useState('All Announcement');
  const [department, setDepartment] = useState('all');
  const [sort, setSort] = useState('newest');

  return (
    <div className='flex justify-content overflow-hidden w-full h-full'>
      <div className='sticky w-[30%] mx-3'>
        <FilterTab 
          onCategoryChange={setCategory} 
          onDepartmentChange={setDepartment} 
          onSort={setSort} 
        />
      </div>
      <div className='flex-flex-col w-[50%] h-screen'>
        <CreateCard />
        <Feed 
          curCategory={category} 
          curDepartment={department} 
          curSort={sort} 
        />
      </div>
      <div className='w-[35%]'>
        <GreetFeed />
      </div>
    </div>
  );
};

export default FeedPage;
