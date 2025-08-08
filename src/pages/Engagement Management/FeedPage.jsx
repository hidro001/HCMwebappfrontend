import { useState } from 'react';  
import Feed from '../../components/engagement/Feed';
import FilterTab from '../../components/engagement/FilterFeed/FilterTab';
import GreetFeed from '../../components/engagement/todayCelebrate/GreetFeed';
import CreateCard from '../../components/engagement/Card/CreateCard';

const FeedPage = () => {
  const [category, setCategory] = useState('All Announcement');
  const [department, setDepartment] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false); 
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden px-5">

      <div className="lg:hidden px-4 py-2">
        <button
          onClick={() => setShowFilters(prev => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`
          w-full lg:w-[20%]  
          ${showFilters ? 'block' : 'hidden'} 
          lg:block
        `}
      >
        <FilterTab 
          onCategoryChange={setCategory} 
          onDepartmentChange={setDepartment} 
          onSort={setSort} 
        />
      </div>

      <div className="w-full lg:w-[50%] h-full mb-4 px-5 lg:mb-0">
        <CreateCard refreshStatus={setRefresh} />
        <Feed 
          curCategory={category} 
          curDepartment={department} 
          curSort={sort} 
          onRefresh={refresh}
        />
      </div>

      <div className="w-full lg:w-[35%]">
        <GreetFeed />
      </div>
    </div>
  );
};

export default FeedPage;
